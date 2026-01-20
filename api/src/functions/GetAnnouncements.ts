import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: 'select * from Announcements',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetAnnouncements(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const announcements = context.extraInputs.get(sqlInput);
    return {
        status: 200,
        jsonBody: announcements
    };
};

app.http('GetAnnouncements', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'announcements',
    extraInputs: [sqlInput],
    handler: GetAnnouncements,
});
