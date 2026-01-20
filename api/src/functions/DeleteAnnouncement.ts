import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

export async function DeleteAnnouncement(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:announcements");
  if (auth) {
    return auth;
  }

  const idParam = request.params.id;
  const id = Number(idParam);
  if (!idParam || Number.isNaN(id)) {
    return { status: 400, jsonBody: { message: 'Id is required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Announcements WHERE Id = @id');

  return { status: 200, jsonBody: { Id: id } };
}

app.http('DeleteAnnouncement', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'announcements/{id:int}',
  handler: DeleteAnnouncement,
});
