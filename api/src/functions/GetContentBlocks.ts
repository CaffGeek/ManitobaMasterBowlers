import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: `select *
        from ContentBlocks c
        where DeleteDate is null
          and (
            ContentBlock = @key 
            or ContentBlock = ISNULL(@key, ContentBlock)
            or ContentBlock = CONCAT(@key, ContentBlock)
          )`,
          parameters: '@key={key}',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetContentBlocks(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const contentBlock = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: contentBlock
    };
};

app.http('GetContentBlocks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'contentblocks/{key?}',
    extraInputs: [sqlInput],
    handler: GetContentBlocks,
});
