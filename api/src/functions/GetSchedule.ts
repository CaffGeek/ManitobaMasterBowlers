import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: `select s.SeasonDesc, t.*
        from SeasonTable s
        join TournamentTable t on s.SeasonCode = t.SeasonCode`,
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetSchedule(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const seasons = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: seasons
    };
};

app.http('GetSchedule', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'schedule',
    extraInputs: [sqlInput],
    handler: GetSchedule,
});
