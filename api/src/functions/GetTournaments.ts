import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: 'select * from TournamentTable',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetTournaments(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const tournaments = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: tournaments
    };
};

app.http('GetTournaments', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'tournaments',
    extraInputs: [sqlInput],
    handler: GetTournaments,
});
