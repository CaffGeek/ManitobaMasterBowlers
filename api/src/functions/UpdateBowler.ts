import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';

type UpdateBowlerBody = {
  name?: string;
};

export async function UpdateBowler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const id = Number(request.params.id);
  if (!id) {
    return { status: 400, jsonBody: { message: 'Bowler id is required.' } };
  }

  const body = (await request.json()) as UpdateBowlerBody | undefined;
  const name = (body?.name || '').trim();
  if (!name) {
    return { status: 400, jsonBody: { message: 'Bowler name is required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.VarChar(50), name)
    .query('UPDATE MasterList SET Name = @name WHERE ID = @id');

  return { status: 200, jsonBody: { id, name } };
};

app.http('UpdateBowler', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'bowlers/{id:int}',
  handler: UpdateBowler,
});
