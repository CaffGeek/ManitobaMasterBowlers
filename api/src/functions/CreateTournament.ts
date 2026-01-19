import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';

type CreateTournamentBody = {
  Id?: number;
  SeasonCode?: string;
  Division?: string;
  TournamentNumber?: number;
  TournamentLocation?: string;
  TournamentDetails?: string;
};

export async function CreateTournament(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const body = (await request.json()) as CreateTournamentBody | undefined;
  const seasonCode = (body?.SeasonCode || '').trim();
  const division = (body?.Division || '').trim();
  const tournamentNumber = body?.TournamentNumber ?? null;
  const tournamentLocation = (body?.TournamentLocation || '').trim();
  const tournamentDetails = (body?.TournamentDetails || '').trim();

  if (!seasonCode || !division) {
    return { status: 400, jsonBody: { message: 'SeasonCode and Division are required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  let id = body?.Id;

  if (!id) {
    const maxResult = await pool.request().query('SELECT ISNULL(MAX(Id), 0) AS MaxId FROM TournamentTable');
    id = (maxResult.recordset?.[0]?.MaxId || 0) + 1;
  }

  const exists = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT 1 FROM TournamentTable WHERE Id = @id');
  if (exists.recordset?.length) {
    return { status: 409, jsonBody: { message: 'Tournament id already exists.' } };
  }

  await pool.request()
    .input('id', sql.Int, id)
    .input('seasonCode', sql.VarChar(4), seasonCode)
    .input('division', sql.VarChar(15), division)
    .input('tournamentNumber', sql.Int, tournamentNumber)
    .input('tournamentLocation', sql.VarChar(75), tournamentLocation || null)
    .input('tournamentDetails', sql.VarChar(75), tournamentDetails || null)
    .query(`
      INSERT INTO TournamentTable (Id, SeasonCode, Division, TournamentNumber, TournamentLocation, TournamentDetails)
      VALUES (@id, @seasonCode, @division, @tournamentNumber, @tournamentLocation, @tournamentDetails)
    `);

  return { status: 201, jsonBody: { Id: id } };
};

app.http('CreateTournament', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'tournaments',
  handler: CreateTournament,
});
