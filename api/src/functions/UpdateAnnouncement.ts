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

export async function UpdateAnnouncement(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:announcements");
  if (auth) {
    return auth;
  }

  const idParam = request.params.id;
  const id = Number(idParam);
  if (!idParam || Number.isNaN(id)) {
    return { status: 400, jsonBody: { message: 'Id is required.' } };
  }

  const body = (await request.json()) as AnnouncementBody | undefined;
  const message = body?.Announcement !== undefined ? (body?.Announcement || '').trim() : undefined;
  if (!body?.StartDate || !body?.EndDate) {
    return { status: 400, jsonBody: { message: 'StartDate and EndDate are required.' } };
  }

  const startDate = parseDate(body?.StartDate ?? null);
  const endDate = parseDate(body?.EndDate ?? null);
  if (!startDate) {
    return { status: 400, jsonBody: { message: 'StartDate must be a valid date.' } };
  }
  if (!endDate) {
    return { status: 400, jsonBody: { message: 'EndDate must be a valid date.' } };
  }

  const updates: string[] = [];
  if (message !== undefined) {
    updates.push('Announcement = @announcement');
  }
  if (startDate !== undefined) {
    updates.push('StartDate = @startDate');
  }
  if (endDate !== undefined) {
    updates.push('EndDate = @endDate');
  }

  if (updates.length === 0) {
    return { status: 400, jsonBody: { message: 'No fields to update.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  const requestSql = pool.request().input('id', sql.Int, id);
  if (message !== undefined) {
    requestSql.input('announcement', sql.NVarChar(sql.MAX), message);
  }
  if (startDate !== undefined) {
    requestSql.input('startDate', sql.DateTime, startDate);
  }
  if (endDate !== undefined) {
    requestSql.input('endDate', sql.DateTime, endDate);
  }

  await requestSql.query(`UPDATE Announcements SET ${updates.join(', ')} WHERE Id = @id`);

  return { status: 200, jsonBody: { Id: id } };
}

app.http('UpdateAnnouncement', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'announcements/{id:int}',
  handler: UpdateAnnouncement,
});
