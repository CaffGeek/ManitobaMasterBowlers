import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';

type AddBowlerSeasonBody = {
  bowlerId?: number;
  name?: string;
  gender?: string;
  TournamentFlag?: boolean;
  TeachingFlag?: boolean;
  SeniorFlag?: boolean;
};

export async function AddBowlerSeason(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const season = (request.params.season || '').trim();
  if (!season) {
    return { status: 400, jsonBody: { message: 'Season is required.' } };
  }

  const body = (await request.json()) as AddBowlerSeasonBody | undefined;
  const name = (body?.name || '').trim();
  let bowlerId = body?.bowlerId;

  if (!bowlerId && !name) {
    return { status: 400, jsonBody: { message: 'Bowler name or id is required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);

  if (!bowlerId) {
    const gender = (body?.gender || '').trim();
    if (!gender) {
      return { status: 400, jsonBody: { message: 'Gender is required for new bowlers.' } };
    }

    const insertResult = await pool.request()
      .input('name', sql.VarChar(50), name)
      .input('gender', sql.VarChar(50), gender)
      .query('INSERT INTO MasterList (Name, Gender) OUTPUT INSERTED.ID VALUES (@name, @gender)');

    bowlerId = insertResult.recordset?.[0]?.ID;
  }

  if (!bowlerId) {
    return { status: 500, jsonBody: { message: 'Unable to resolve bowler id.' } };
  }

  const tournamentFlag = body?.TournamentFlag ? 1 : 0;
  const teachingFlag = body?.TeachingFlag ? 1 : 0;
  const seniorFlag = body?.SeniorFlag ? 1 : 0;

  await pool.request()
    .input('bowlerId', sql.Int, bowlerId)
    .input('season', sql.VarChar(4), season)
    .input('tournamentFlag', sql.Int, tournamentFlag)
    .input('teachingFlag', sql.Int, teachingFlag)
    .input('seniorFlag', sql.Int, seniorFlag)
    .query(`
      IF EXISTS (SELECT 1 FROM MasterSeasonList WHERE BowlerId = @bowlerId AND SeasonYear = @season)
      BEGIN
        UPDATE MasterSeasonList
        SET TournamentFlag = @tournamentFlag,
            TeachingFlag = @teachingFlag,
            SeniorFlag = @seniorFlag
        WHERE BowlerId = @bowlerId AND SeasonYear = @season;
      END
      ELSE
      BEGIN
        INSERT INTO MasterSeasonList (BowlerId, SeasonYear, TournamentFlag, TeachingFlag, SeniorFlag)
        VALUES (@bowlerId, @season, @tournamentFlag, @teachingFlag, @seniorFlag);
      END
    `);

  return { status: 200, jsonBody: { bowlerId } };
};

app.http('AddBowlerSeason', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'bowlerseasons/{season}',
  handler: AddBowlerSeason,
});
