import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import { requirePermission } from "./auth";
import { ContingentEntryType, ContingentFinish, getGroupConfigs, SaveContingentEntry } from "./contingent-utils";

type SaveContingentBody = {
  entries?: SaveContingentEntry[];
};

export async function SaveContingents(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const auth = await requirePermission(request, "edit:tournament");
  if (auth) {
    return auth;
  }

  const seasonCode = (request.params.season || '').trim();
  if (!seasonCode) {
    return { status: 400, jsonBody: { message: 'Season code is required.' } };
  }

  const body = (await request.json()) as SaveContingentBody | undefined;
  const entries = (body?.entries || []).filter((entry) => !!entry?.bowlerId);
  const validGroupKeys = new Set(getGroupConfigs().map((group) => group.key));
  const validEntryTypes = new Set<ContingentEntryType>(['Singles', 'Team', 'Coach']);
  const validFinishes = new Set<ContingentFinish>([1, 2, 3, 4, 5, 6, 7, 8]);

  if (entries.some((entry) => !validGroupKeys.has(entry.groupKey))) {
    return { status: 400, jsonBody: { message: 'Invalid contingent group key.' } };
  }

  if (entries.some((entry) => !validEntryTypes.has(entry.entryType))) {
    return { status: 400, jsonBody: { message: 'Invalid contingent entry type.' } };
  }

  if (entries.some((entry) => !!entry.finish && !validFinishes.has(entry.finish))) {
    return { status: 400, jsonBody: { message: 'Invalid contingent finish.' } };
  }

  const connectionString = process.env.SqlConnectionString;
  if (!connectionString) {
    return { status: 500, jsonBody: { message: 'SqlConnectionString is not configured.' } };
  }

  const pool = await sql.connect(connectionString);
  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    await new sql.Request(transaction)
      .input('seasonCode', sql.VarChar(4), seasonCode)
      .query('DELETE FROM NationalContingentEntries WHERE SeasonCode = @seasonCode');

    for (const entry of entries) {
      await new sql.Request(transaction)
        .input('seasonCode', sql.VarChar(4), seasonCode)
        .input('groupKey', sql.VarChar(40), entry.groupKey)
        .input('division', sql.VarChar(15), entry.division)
        .input('gender', sql.VarChar(1), entry.gender || null)
        .input('entryType', sql.VarChar(10), entry.entryType)
        .input('position', sql.Int, entry.position)
        .input('bowlerId', sql.Int, entry.bowlerId)
        .input('finish', sql.Int, entry.finish || null)
        .query(`
          INSERT INTO NationalContingentEntries
            (SeasonCode, GroupKey, Division, Gender, EntryType, Position, BowlerId, Finish, UpdatedAt)
          VALUES
            (@seasonCode, @groupKey, @division, @gender, @entryType, @position, @bowlerId, @finish, SYSUTCDATETIME())
        `);
    }

    await transaction.commit();
    return { status: 200 };
  } catch (error) {
    await transaction.rollback();
    return {
      status: 500,
      jsonBody: { message: error instanceof Error ? error.message : 'Could not save contingents.' },
    };
  }
}

app.http('SaveContingents', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'contingents/{season}',
  handler: SaveContingents,
});
