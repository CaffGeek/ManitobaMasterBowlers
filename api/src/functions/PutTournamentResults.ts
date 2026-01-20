import { app, output, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requirePermission } from "./auth";

const sqlOutput = output.sql({
    commandText: `TournamentResults`,
    connectionStringSetting: 'SqlConnectionString'
})

export async function PutTournamentResults(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const auth = await requirePermission(request, "edit:tournament");
    if (auth) {
        return auth;
    }

    const body = await request.json();
    context.extraOutputs.set(sqlOutput, body);

    return { status: 201 };
};

app.http('PutTournamentResults', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'tournamentresults/{id:int?}',
    extraOutputs: [sqlOutput],
    handler: PutTournamentResults,
});
