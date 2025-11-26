import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: 'select * from SeasonTable',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetSeasons(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const seasons = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: seasons
    };
};

app.http('GetSeasons', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'seasons',
    extraInputs: [sqlInput],
    handler: GetSeasons,
});
