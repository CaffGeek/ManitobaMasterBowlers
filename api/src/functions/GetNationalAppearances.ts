import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requestedEffectiveBowlerIdSql } from "./sql-effective-bowler";

const sqlInput = input.generic({
  type: 'sql',
  commandText: `
    select
      e.SeasonCode,
      s.SeasonDesc,
      e.GroupKey,
      e.Division,
      e.Gender,
      e.EntryType,
      e.Position,
      e.Finish,
      case
        when e.GroupKey = 'tournament-men' then 'Tournament Men'
        when e.GroupKey = 'tournament-women' then 'Tournament Women'
        when e.GroupKey = 'teaching-men' then 'Teaching Men'
        when e.GroupKey = 'teaching-women' then 'Teaching Women'
        when e.GroupKey = 'senior-mixed' then 'Senior Mixed'
        else e.GroupKey
      end as GroupLabel
    from NationalContingentEntries e
    left join SeasonTable s on s.SeasonCode = e.SeasonCode
    join MasterList ml on ml.ID = e.BowlerId
    where coalesce(ml.CanonicalBowlerId, ml.ID) = ${requestedEffectiveBowlerIdSql('@id')}
    order by e.SeasonCode desc,
      case e.EntryType
        when 'Coach' then 3
        when 'Singles' then 1
        else 2
      end,
      e.Position
  `,
  parameters: '@id={id}',
  commandType: 'Text',
  connectionStringSetting: 'SqlConnectionString'
});

export async function GetNationalAppearances(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const rows = JSON.stringify(context.extraInputs.get(sqlInput));

  return {
    status: 200,
    body: rows
  };
}

app.http('GetNationalAppearances', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'nationalappearances/{id:int}',
  extraInputs: [sqlInput],
  handler: GetNationalAppearances,
});
