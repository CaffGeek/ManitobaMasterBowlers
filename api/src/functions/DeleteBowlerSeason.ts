import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

export async function DeleteBowlerSeason(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:bowler");
  if (auth) {
    return auth;
  }

  const season = (request.params.season || '').trim();
  const bowlerId = Number(request.params.bowlerId);
  if (!season || !bowlerId) {
    return { status: 400, jsonBody: { message: 'Season and bowlerId are required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  await pool.request()
    .input('bowlerId', sql.Int, bowlerId)
    .input('season', sql.VarChar(4), season)
    .query('DELETE FROM MasterSeasonList WHERE BowlerId = @bowlerId AND SeasonYear = @season');

  return { status: 200 };
};

app.http('DeleteBowlerSeason', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'bowlerseasons/{season}/{bowlerId:int}',
  handler: DeleteBowlerSeason,
});
