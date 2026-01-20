import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

type UpdateTournamentBody = {
  SeasonCode?: string;
  Division?: string;
  TournamentNumber?: number;
  TournamentLocation?: string;
  TournamentDetails?: string;
};

export async function UpdateTournament(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:schedule");
  if (auth) {
    return auth;
  }

  const id = Number(request.params.id);
  if (!id) {
    return { status: 400, jsonBody: { message: 'Tournament id is required.' } };
  }

  const body = (await request.json()) as UpdateTournamentBody | undefined;
  const seasonCode = (body?.SeasonCode || '').trim();
  const division = (body?.Division || '').trim();

  if (!seasonCode || !division) {
    return { status: 400, jsonBody: { message: 'SeasonCode and Division are required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  await pool.request()
    .input('id', sql.Int, id)
    .input('seasonCode', sql.VarChar(4), seasonCode)
    .input('division', sql.VarChar(15), division)
    .input('tournamentNumber', sql.Int, body?.TournamentNumber ?? null)
    .input('tournamentLocation', sql.VarChar(75), (body?.TournamentLocation || '').trim() || null)
    .input('tournamentDetails', sql.VarChar(75), (body?.TournamentDetails || '').trim() || null)
    .query(`
      UPDATE TournamentTable
      SET SeasonCode = @seasonCode,
          Division = @division,
          TournamentNumber = @tournamentNumber,
          TournamentLocation = @tournamentLocation,
          TournamentDetails = @tournamentDetails
      WHERE Id = @id
    `);

  return { status: 200 };
};

app.http('UpdateTournament', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'tournaments/{id:int}',
  handler: UpdateTournament,
});
