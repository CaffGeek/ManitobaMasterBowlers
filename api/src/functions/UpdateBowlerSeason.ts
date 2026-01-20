import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

type UpdateBowlerSeasonBody = {
  TournamentFlag?: boolean;
  TeachingFlag?: boolean;
  SeniorFlag?: boolean;
};

export async function UpdateBowlerSeason(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:bowler");
  if (auth) {
    return auth;
  }

  const season = (request.params.season || '').trim();
  const bowlerId = Number(request.params.bowlerId);
  if (!season || !bowlerId) {
    return { status: 400, jsonBody: { message: 'Season and bowlerId are required.' } };
  }

  const body = (await request.json()) as UpdateBowlerSeasonBody | undefined;
  const tournamentFlag = body?.TournamentFlag ? 1 : 0;
  const teachingFlag = body?.TeachingFlag ? 1 : 0;
  const seniorFlag = body?.SeniorFlag ? 1 : 0;

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  await pool.request()
    .input('bowlerId', sql.Int, bowlerId)
    .input('season', sql.VarChar(4), season)
    .input('tournamentFlag', sql.Int, tournamentFlag)
    .input('teachingFlag', sql.Int, teachingFlag)
    .input('seniorFlag', sql.Int, seniorFlag)
    .query(`
      UPDATE MasterSeasonList
      SET TournamentFlag = @tournamentFlag,
          TeachingFlag = @teachingFlag,
          SeniorFlag = @seniorFlag
      WHERE BowlerId = @bowlerId AND SeasonYear = @season
    `);

  return { status: 200 };
};

app.http('UpdateBowlerSeason', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'bowlerseasons/{season}/{bowlerId:int}',
  handler: UpdateBowlerSeason,
});
