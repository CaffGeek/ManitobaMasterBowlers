import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

type DeleteRequestBody = {
  ids?: number[];
};

export async function DeleteTournamentResults(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:tournament");
  if (auth) {
    return auth;
  }

  const body = (await request.json()) as DeleteRequestBody | undefined;
  const ids = Array.isArray(body?.ids) ? body.ids : [];

  if (ids.length === 0) {
    return { status: 400, jsonBody: { message: 'No ids provided.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  const requestSql = pool.request();
  const paramNames: string[] = [];

  ids.forEach((id: number, index: number) => {
    const param = `id${index}`;
    paramNames.push(`@${param}`);
    requestSql.input(param, sql.Int, id);
  });

  const deleteQuery = `DELETE FROM TournamentResults WHERE Id IN (${paramNames.join(', ')})`;
  await requestSql.query(deleteQuery);

  return { status: 200, jsonBody: { deleted: ids.length } };
};

app.http('DeleteTournamentResults', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'tournamentresults/{id:int?}/delete',
  handler: DeleteTournamentResults,
});
