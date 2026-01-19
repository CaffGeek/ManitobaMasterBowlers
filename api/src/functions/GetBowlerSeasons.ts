import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
  type: 'sql',
  commandText: `
    select
      ms.BowlerId,
      ml.Name,
      ml.Gender,
      ms.SeasonYear,
      ms.TournamentFlag,
      ms.TeachingFlag,
      ms.SeniorFlag
    from MasterSeasonList ms
    join MasterList ml on ml.ID = ms.BowlerId
    where ms.SeasonYear = @season
  `,
  parameters: '@season={season}',
  commandType: 'Text',
  connectionStringSetting: 'SqlConnectionString'
});

export async function GetBowlerSeasons(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const rows = JSON.stringify(context.extraInputs.get(sqlInput));

  return {
    status: 200,
    body: rows
  };
};

app.http('GetBowlerSeasons', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'bowlerseasons/{season}',
  extraInputs: [sqlInput],
  handler: GetBowlerSeasons,
});
