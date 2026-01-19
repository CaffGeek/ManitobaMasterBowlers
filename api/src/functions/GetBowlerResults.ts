import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: `select
                r.TournamentId,
                t.SeasonCode,
                t.Division,
                t.TournamentNumber,
                t.TournamentLocation,
                t.TournamentDetails,
                r.BowlerId,
                r.Game1,
                r.Game2,
                r.Game3,
                r.Game4,
                r.Game5,
                r.Game6,
                r.Game7,
                r.Game8,
                r.BowlerAverage,
                ISNULL(r.IgnoreForAverage, 0) as IgnoreForAverage,
                ISNULL(r.WonStars, 0) as WonStars
            from TournamentTable as t
            join TournamentResults as r
                on t.id = r.TournamentId
            where r.BowlerId = @id`,
    parameters: '@id={id}',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetBowlerResults(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const bowlerresults = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: bowlerresults
    };
};

app.http('GetBowlerResults', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'bowlerresults/{id:int?}',
    extraInputs: [sqlInput],
    handler: GetBowlerResults,
});
