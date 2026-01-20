import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
  type: 'sql',
  commandText: `
    select
      r.BowlerId,
      m.Name as Bowler,
      t.SeasonCode,
      s.SeasonDesc,
      t.Division,
      t.Id as TournamentId,
      t.TournamentNumber,
      t.TournamentLocation,
      t.TournamentDetails
    from TournamentResults r
    join MasterList m on m.ID = r.BowlerId
    join TournamentTable t on t.Id = r.TournamentId
    join SeasonTable s on s.SeasonCode = t.SeasonCode
    where r.WonStars = 1
  `,
  commandType: 'Text',
  connectionStringSetting: 'SqlConnectionString'
});

export async function GetStarWinners(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const winners = JSON.stringify(context.extraInputs.get(sqlInput));

  return {
    status: 200,
    body: winners
  };
};

app.http('GetStarWinners', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'winners',
  extraInputs: [sqlInput],
  handler: GetStarWinners,
});
