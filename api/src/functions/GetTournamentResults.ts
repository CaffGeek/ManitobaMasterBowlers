import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: `select 
            t.Id,
            t.TournamentId,
            t.BowlerId,
            b.Name as Bowler,
            b.Gender as Gender,
            t.Game1,
            t.Game2,
            t.Game3,
            t.Game4,
            t.Game5,
            t.Game6,
            t.Game7,
            t.Game8,
            t.BowlerAverage as Average,
            ISNULL(t.IgnoreForAverage, 0) as IgnoreForAverage,
            ISNULL(t.WonStars, 0) as WonStars
        from TournamentResults t
        join MasterList as b
            on t.BowlerId = b.ID
        where t.TournamentId = @id or t.TournamentId = ISNULL(@id, t.TournamentId)`,
    parameters: '@id={id}',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetTournamentResults(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const tournamentresults = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: tournamentresults
    };
};

app.http('GetTournamentResults', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'tournamentresults/{id:int?}',
    extraInputs: [sqlInput],
    handler: GetTournamentResults,
});
