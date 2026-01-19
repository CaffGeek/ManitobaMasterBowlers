import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';

type CreateSeasonBody = {
  SeasonCode?: string;
  SeasonDesc?: string;
};

export async function CreateSeason(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const body = (await request.json()) as CreateSeasonBody | undefined;
  const seasonCode = (body?.SeasonCode || '').trim();
  const seasonDesc = (body?.SeasonDesc || '').trim();

  if (!seasonCode || !seasonDesc) {
    return { status: 400, jsonBody: { message: 'SeasonCode and SeasonDesc are required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  const exists = await pool.request()
    .input('seasonCode', sql.VarChar(4), seasonCode)
    .query('SELECT 1 FROM SeasonTable WHERE SeasonCode = @seasonCode');

  if (exists.recordset?.length) {
    return { status: 409, jsonBody: { message: 'SeasonCode already exists.' } };
  }

  await pool.request()
    .input('seasonCode', sql.VarChar(4), seasonCode)
    .input('seasonDesc', sql.VarChar(12), seasonDesc)
    .query('INSERT INTO SeasonTable (SeasonCode, SeasonDesc) VALUES (@seasonCode, @seasonDesc)');

  return { status: 201, jsonBody: { SeasonCode: seasonCode, SeasonDesc: seasonDesc } };
};

app.http('CreateSeason', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'seasons',
  handler: CreateSeason,
});
