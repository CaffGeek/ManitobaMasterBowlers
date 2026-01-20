import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

type UpdateBowlerBody = {
  name?: string;
  gender?: string;
};

export async function UpdateBowler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:bowler");
  if (auth) {
    return auth;
  }

  const id = Number(request.params.id);
  if (!id) {
    return { status: 400, jsonBody: { message: 'Bowler id is required.' } };
  }

  const body = (await request.json()) as UpdateBowlerBody | undefined;
  const name = (body?.name || '').trim();
  const gender = (body?.gender || '').trim();
  if (!name && !gender) {
    return { status: 400, jsonBody: { message: 'Bowler name or gender is required.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  const updateFields: string[] = [];
  const requestSql = pool.request().input('id', sql.Int, id);
  if (name) {
    updateFields.push('Name = @name');
    requestSql.input('name', sql.VarChar(50), name);
  }
  if (gender) {
    updateFields.push('Gender = @gender');
    requestSql.input('gender', sql.VarChar(50), gender);
  }

  await requestSql.query(`UPDATE MasterList SET ${updateFields.join(', ')} WHERE ID = @id`);

  return { status: 200, jsonBody: { id, name, gender } };
};

app.http('UpdateBowler', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'bowlers/{id:int}',
  handler: UpdateBowler,
});
