import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import * as sql from 'mssql';
import { requirePermission } from './auth';

type PlacementBody = {
  Id?: number;
  Location?: string;
  PageMatchType?: string;
  PageValue?: string | null;
  SortOrder?: number;
};

type SponsorBody = {
  Name?: string;
  WebsiteUrl?: string | null;
  DefaultLogoUrl?: string | null;
  Notes?: string | null;
  IsActive?: boolean;
};

type SponsorAdBody = {
  SponsorId?: number;
  Name?: string;
  ContentHtml?: string;
  StartDate?: string | null;
  EndDate?: string | null;
  IsActive?: boolean;
  Priority?: number;
  RotationSeconds?: number | null;
  Placements?: PlacementBody[];
};

const LOCATIONS = new Set(['Top', 'Bottom', 'Left', 'Right', 'Overlay']);
const MATCH_TYPES = new Set(['All', 'Exact', 'Prefix', 'Sitemap']);

const connectionString = () => process.env.SqlConnectionString || '';

const normalizePath = (value?: string | null): string => {
  const withoutQuery = (value || '/').split('?')[0].split('#')[0].trim() || '/';
  const withSlash = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, '') : withSlash;
};

const placementMatches = (placement: any, path: string): boolean => {
  const type = placement.PageMatchType;
  const value = (placement.PageValue || '').trim();
  if (type === 'All') {
    return true;
  }
  if (type === 'Exact') {
    return normalizePath(value) === path;
  }
  if (type === 'Prefix') {
    return path.startsWith(normalizePath(value));
  }
  if (type === 'Sitemap') {
    const slug = value.replace(/^\/+|\/+$/g, '');
    return path === `/content/${slug}` || path.toLowerCase() === `/${slug.toLowerCase()}.aspx`;
  }
  return false;
};

const parseOptionalDate = (value?: string | null): Date | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const validatePlacements = (placements: PlacementBody[]): string | null => {
  if (!placements.length) {
    return 'At least one placement is required.';
  }
  for (const placement of placements) {
    if (!LOCATIONS.has(placement.Location || '')) {
      return 'Placement location is invalid.';
    }
    if (!MATCH_TYPES.has(placement.PageMatchType || '')) {
      return 'Page match type is invalid.';
    }
    if (placement.PageMatchType !== 'All' && !(placement.PageValue || '').trim()) {
      return 'Page value is required unless the placement applies to all pages.';
    }
  }
  return null;
};

export async function GetSponsorAds(request: HttpRequest): Promise<HttpResponseInit> {
  if (!connectionString()) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const path = normalizePath(request.query.get('path'));
  const pool = await sql.connect(connectionString());
  const result = await pool.request().query(`
    SELECT
      a.Id, a.SponsorId, a.Name, a.ContentHtml, a.StartDate, a.EndDate,
      a.Priority, a.RotationSeconds,
      s.Name AS SponsorName, s.WebsiteUrl, s.DefaultLogoUrl,
      p.Id AS PlacementId, p.Location, p.PageMatchType, p.PageValue, p.SortOrder
    FROM dbo.SponsorAds a
    JOIN dbo.Sponsors s ON s.Id = a.SponsorId
    JOIN dbo.SponsorAdPlacements p ON p.SponsorAdId = a.Id
    WHERE a.IsActive = 1
      AND s.IsActive = 1
      AND (a.StartDate IS NULL OR a.StartDate <= SYSUTCDATETIME())
      AND (a.EndDate IS NULL OR a.EndDate >= SYSUTCDATETIME())
    ORDER BY a.Priority DESC, p.SortOrder ASC, a.Id ASC
  `);

  const ads = new Map<number, any>();
  for (const row of result.recordset || []) {
    if (!placementMatches(row, path)) {
      continue;
    }
    if (!ads.has(row.Id)) {
      ads.set(row.Id, {
        Id: row.Id,
        SponsorId: row.SponsorId,
        SponsorName: row.SponsorName,
        WebsiteUrl: row.WebsiteUrl,
        DefaultLogoUrl: row.DefaultLogoUrl,
        Name: row.Name,
        ContentHtml: row.ContentHtml,
        Priority: row.Priority,
        RotationSeconds: row.RotationSeconds,
        Locations: [],
      });
    }
    const ad = ads.get(row.Id);
    if (!ad.Locations.includes(row.Location)) {
      ad.Locations.push(row.Location);
    }
  }

  return { status: 200, jsonBody: Array.from(ads.values()) };
}

export async function GetSponsors(request: HttpRequest): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, 'edit:content');
  if (auth) return auth;
  if (!connectionString()) return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };

  const pool = await sql.connect(connectionString());
  const result = await pool.request().query(`
    SELECT * FROM dbo.Sponsors ORDER BY Name;
    SELECT * FROM dbo.SponsorAds ORDER BY SponsorId, Priority DESC, Name;
    SELECT * FROM dbo.SponsorAdPlacements ORDER BY SponsorAdId, SortOrder, Id;
  `);
  const sponsors = result.recordsets[0] || [];
  const ads = result.recordsets[1] || [];
  const placements = result.recordsets[2] || [];
  for (const sponsor of sponsors) {
    sponsor.Ads = ads.filter((ad: any) => ad.SponsorId === sponsor.Id);
    for (const ad of sponsor.Ads) {
      ad.Placements = placements.filter((placement: any) => placement.SponsorAdId === ad.Id);
    }
  }
  return { status: 200, jsonBody: sponsors };
}

async function saveSponsor(request: HttpRequest, id?: number): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, 'edit:content');
  if (auth) return auth;
  const body = (await request.json()) as SponsorBody;
  const name = (body.Name || '').trim();
  if (!name) return { status: 400, jsonBody: { message: 'Sponsor name is required.' } };
  if (!connectionString()) return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };

  const pool = await sql.connect(connectionString());
  const sqlRequest = pool.request()
    .input('name', sql.NVarChar(150), name)
    .input('websiteUrl', sql.NVarChar(500), body.WebsiteUrl?.trim() || null)
    .input('defaultLogoUrl', sql.NVarChar(1000), body.DefaultLogoUrl?.trim() || null)
    .input('notes', sql.NVarChar(sql.MAX), body.Notes?.trim() || null)
    .input('isActive', sql.Bit, body.IsActive !== false);

  if (id) {
    sqlRequest.input('id', sql.Int, id);
    await sqlRequest.query(`
      UPDATE dbo.Sponsors SET Name=@name, WebsiteUrl=@websiteUrl,
        DefaultLogoUrl=@defaultLogoUrl, Notes=@notes, IsActive=@isActive,
        UpdatedAt=SYSUTCDATETIME()
      WHERE Id=@id
    `);
    return { status: 200, jsonBody: { Id: id } };
  }

  const result = await sqlRequest.query(`
    INSERT dbo.Sponsors (Name, WebsiteUrl, DefaultLogoUrl, Notes, IsActive)
    OUTPUT INSERTED.Id
    VALUES (@name, @websiteUrl, @defaultLogoUrl, @notes, @isActive)
  `);
  return { status: 201, jsonBody: { Id: result.recordset[0].Id } };
}

async function saveSponsorAd(request: HttpRequest, id?: number): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, 'edit:content');
  if (auth) return auth;
  const body = (await request.json()) as SponsorAdBody;
  const sponsorId = Number(body.SponsorId);
  const name = (body.Name || '').trim();
  const contentHtml = (body.ContentHtml || '').trim();
  const placements = body.Placements || [];
  if (!sponsorId || !name || !contentHtml) {
    return { status: 400, jsonBody: { message: 'Sponsor, ad name, and content are required.' } };
  }
  const placementError = validatePlacements(placements);
  if (placementError) return { status: 400, jsonBody: { message: placementError } };

  const startDate = parseOptionalDate(body.StartDate);
  const endDate = parseOptionalDate(body.EndDate);
  if (body.StartDate && startDate === undefined) return { status: 400, jsonBody: { message: 'Start date is invalid.' } };
  if (body.EndDate && endDate === undefined) return { status: 400, jsonBody: { message: 'End date is invalid.' } };
  if (startDate && endDate && endDate < startDate) return { status: 400, jsonBody: { message: 'End date must be after start date.' } };

  const rotationSeconds = body.RotationSeconds == null ? null : Number(body.RotationSeconds);
  if (rotationSeconds != null && (!Number.isInteger(rotationSeconds) || rotationSeconds < 3 || rotationSeconds > 300)) {
    return { status: 400, jsonBody: { message: 'Rotation seconds must be between 3 and 300.' } };
  }
  if (!connectionString()) return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };

  const pool = await sql.connect(connectionString());
  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  try {
    let adId = id;
    const adRequest = new sql.Request(transaction)
      .input('sponsorId', sql.Int, sponsorId)
      .input('name', sql.NVarChar(150), name)
      .input('contentHtml', sql.NVarChar(sql.MAX), contentHtml)
      .input('startDate', sql.DateTime2, startDate ?? null)
      .input('endDate', sql.DateTime2, endDate ?? null)
      .input('isActive', sql.Bit, body.IsActive !== false)
      .input('priority', sql.Int, Number(body.Priority) || 0)
      .input('rotationSeconds', sql.Int, rotationSeconds);

    if (adId) {
      adRequest.input('id', sql.Int, adId);
      await adRequest.query(`
        UPDATE dbo.SponsorAds SET SponsorId=@sponsorId, Name=@name,
          ContentHtml=@contentHtml, StartDate=@startDate, EndDate=@endDate,
          IsActive=@isActive, Priority=@priority, RotationSeconds=@rotationSeconds,
          UpdatedAt=SYSUTCDATETIME()
        WHERE Id=@id
      `);
      await new sql.Request(transaction).input('adId', sql.Int, adId)
        .query('DELETE FROM dbo.SponsorAdPlacements WHERE SponsorAdId=@adId');
    } else {
      const inserted = await adRequest.query(`
        INSERT dbo.SponsorAds (SponsorId, Name, ContentHtml, StartDate, EndDate, IsActive, Priority, RotationSeconds)
        OUTPUT INSERTED.Id
        VALUES (@sponsorId, @name, @contentHtml, @startDate, @endDate, @isActive, @priority, @rotationSeconds)
      `);
      adId = inserted.recordset[0].Id;
    }

    for (const placement of placements) {
      await new sql.Request(transaction)
        .input('adId', sql.Int, adId)
        .input('location', sql.VarChar(10), placement.Location)
        .input('pageMatchType', sql.VarChar(10), placement.PageMatchType)
        .input('pageValue', sql.NVarChar(300), placement.PageMatchType === 'All' ? null : placement.PageValue?.trim())
        .input('sortOrder', sql.Int, Number(placement.SortOrder) || 0)
        .query(`
          INSERT dbo.SponsorAdPlacements (SponsorAdId, Location, PageMatchType, PageValue, SortOrder)
          VALUES (@adId, @location, @pageMatchType, @pageValue, @sortOrder)
        `);
    }
    await transaction.commit();
    return { status: id ? 200 : 201, jsonBody: { Id: adId } };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function CreateSponsor(request: HttpRequest) { return saveSponsor(request); }
export async function UpdateSponsor(request: HttpRequest) {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) return { status: 400, jsonBody: { message: 'Sponsor id is invalid.' } };
  return saveSponsor(request, id);
}
export async function CreateSponsorAd(request: HttpRequest) { return saveSponsorAd(request); }
export async function UpdateSponsorAd(request: HttpRequest) {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) return { status: 400, jsonBody: { message: 'Sponsor ad id is invalid.' } };
  return saveSponsorAd(request, id);
}

export async function DeleteSponsor(request: HttpRequest): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, 'edit:content');
  if (auth) return auth;
  if (!connectionString()) return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) return { status: 400, jsonBody: { message: 'Sponsor id is invalid.' } };
  const pool = await sql.connect(connectionString());
  await pool.request().input('id', sql.Int, id).query('DELETE dbo.Sponsors WHERE Id=@id');
  return { status: 200, jsonBody: { Id: id } };
}

export async function DeleteSponsorAd(request: HttpRequest): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, 'edit:content');
  if (auth) return auth;
  if (!connectionString()) return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) return { status: 400, jsonBody: { message: 'Sponsor ad id is invalid.' } };
  const pool = await sql.connect(connectionString());
  await pool.request().input('id', sql.Int, id).query('DELETE dbo.SponsorAds WHERE Id=@id');
  return { status: 200, jsonBody: { Id: id } };
}

app.http('GetSponsorAds', { methods: ['GET'], authLevel: 'anonymous', route: 'sponsorads', handler: GetSponsorAds });
app.http('GetSponsors', { methods: ['GET'], authLevel: 'anonymous', route: 'sponsors', handler: GetSponsors });
app.http('CreateSponsor', { methods: ['POST'], authLevel: 'anonymous', route: 'sponsors', handler: CreateSponsor });
app.http('UpdateSponsor', { methods: ['PUT'], authLevel: 'anonymous', route: 'sponsors/{id:int}', handler: UpdateSponsor });
app.http('DeleteSponsor', { methods: ['DELETE'], authLevel: 'anonymous', route: 'sponsors/{id:int}', handler: DeleteSponsor });
app.http('CreateSponsorAd', { methods: ['POST'], authLevel: 'anonymous', route: 'sponsorads', handler: CreateSponsorAd });
app.http('UpdateSponsorAd', { methods: ['PUT'], authLevel: 'anonymous', route: 'sponsorads/{id:int}', handler: UpdateSponsorAd });
app.http('DeleteSponsorAd', { methods: ['DELETE'], authLevel: 'anonymous', route: 'sponsorads/{id:int}', handler: DeleteSponsorAd });
