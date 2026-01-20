import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

type AnnouncementBody = {
  Announcement?: string;
  StartDate?: string | null;
  EndDate?: string | null;
};

const parseDate = (value?: string | null): Date | null => {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export async function CreateAnnouncement(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:announcements");
  if (auth) {
    return auth;
  }

  const body = (await request.json()) as AnnouncementBody | undefined;
  const message = (body?.Announcement || '').trim();
  if (!message) {
    return { status: 400, jsonBody: { message: 'Announcement is required.' } };
  }

  const startDate = parseDate(body?.StartDate ?? null);
  const endDate = parseDate(body?.EndDate ?? null);
  if (body?.StartDate && !startDate) {
    return { status: 400, jsonBody: { message: 'StartDate must be a valid date.' } };
  }
  if (body?.EndDate && !endDate) {
    return { status: 400, jsonBody: { message: 'EndDate must be a valid date.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  const result = await pool.request()
    .input('announcement', sql.NVarChar(sql.MAX), message)
    .input('startDate', sql.DateTime, startDate)
    .input('endDate', sql.DateTime, endDate)
    .query(`
      INSERT INTO Announcements (Announcement, StartDate, EndDate)
      OUTPUT INSERTED.Id
      VALUES (@announcement, @startDate, @endDate)
    `);

  return { status: 201, jsonBody: { Id: result.recordset?.[0]?.Id } };
}

app.http('CreateAnnouncement', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'announcements',
  handler: CreateAnnouncement,
});
