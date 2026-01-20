import { app, HttpRequest, HttpResponseInit, InvocationContext, output } from "@azure/functions";
import { requirePermission } from "./auth";

const sqlOutput = output.generic({
    type: 'sql',
    commandText: 'dbo.ContentBlocks',
    connectionStringSetting: 'SqlConnectionString',
});

export async function SaveContentBlock(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const auth = await requirePermission(request, "edit:content");
    if (auth) {
        return auth;
    }

    let body: { contentBlock?: string; contentHTML?: string } = {};
    try {
        body = (await request.json()) as { contentBlock?: string; contentHTML?: string };
    } catch {
        body = {};
    }
    const { contentBlock, contentHTML } = body;

    if (!contentBlock || !contentHTML) {
        return { status: 400, body: 'contentBlock and contentHTML are required' };
    }

    const record = {
        ContentBlock: contentBlock,
        ContentHTML: contentHTML,
        CreateDate: new Date().toISOString(),
    };

    context.extraOutputs.set(sqlOutput, record);

    return { status: 200, body: JSON.stringify({ ok: true }) };
};

app.http('SaveContentBlock', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'contentblocks/save',
    extraOutputs: [sqlOutput],
    handler: SaveContentBlock,
});
