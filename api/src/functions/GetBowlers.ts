import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: 'select * from MasterList',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetBowlers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const bowlers = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: bowlers
    };
};

app.http('GetBowlers', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'bowlers',
    extraInputs: [sqlInput],
    handler: GetBowlers,
});
