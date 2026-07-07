import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: `
      select
        m.ID,
        m.Name,
        m.Gender,
        m.EmailAddress,
        m.CanonicalBowlerId,
        coalesce(m.CanonicalBowlerId, m.ID) as EffectiveBowlerId,
        canonical.Name as CanonicalBowlerName
      from MasterList m
      left join MasterList canonical on canonical.ID = m.CanonicalBowlerId
      order by m.Name
    `,
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
