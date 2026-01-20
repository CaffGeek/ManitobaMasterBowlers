import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

export async function DeleteTournament(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:schedule");
  if (auth) {
    return auth;
  }

  const id = Number(request.params.id);
  if (!id) {
    return { status: 400, jsonBody: { message: 'Tournament id is required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM TournamentTable WHERE Id = @id');

  return { status: 200 };
};

app.http('DeleteTournament', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'tournaments/{id:int}',
  handler: DeleteTournament,
});
