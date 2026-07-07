import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";

type UpdateBowlerBody = {
  name?: string;
  gender?: string;
  canonicalBowlerId?: number | null;
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
  const hasCanonicalBowlerId = !!body && Object.prototype.hasOwnProperty.call(body, 'canonicalBowlerId');
  const canonicalBowlerId = body?.canonicalBowlerId ?? null;
  if (!name && !gender && !hasCanonicalBowlerId) {
    return { status: 400, jsonBody: { message: 'Bowler name, gender, or canonical bowler id is required.' } };
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
  if (hasCanonicalBowlerId) {
    if (canonicalBowlerId != null) {
      if (!Number.isInteger(canonicalBowlerId) || canonicalBowlerId <= 0) {
        return { status: 400, jsonBody: { message: 'Canonical bowler id must be a positive integer or null.' } };
      }

      if (canonicalBowlerId === id) {
        return { status: 400, jsonBody: { message: 'A bowler cannot be their own canonical bowler.' } };
      }

      const canonicalCheck = await pool.request()
        .input('canonicalBowlerId', sql.Int, canonicalBowlerId)
        .query(`
          select top 1 ID, CanonicalBowlerId
          from MasterList
          where ID = @canonicalBowlerId
        `);

      const canonicalRow = canonicalCheck.recordset?.[0];
      if (!canonicalRow) {
        return { status: 400, jsonBody: { message: 'Canonical bowler was not found.' } };
      }

      if (canonicalRow.CanonicalBowlerId) {
        return { status: 400, jsonBody: { message: 'Canonical bowler must point to a top-level bowler, not another alias.' } };
      }
    }

    updateFields.push('CanonicalBowlerId = @canonicalBowlerId');
    requestSql.input('canonicalBowlerId', sql.Int, canonicalBowlerId);
  }

  await requestSql.query(`UPDATE MasterList SET ${updateFields.join(', ')} WHERE ID = @id`);

  return { status: 200, jsonBody: { id, name, gender, canonicalBowlerId } };
};

app.http('UpdateBowler', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'bowlers/{id:int}',
  handler: UpdateBowler,
});
