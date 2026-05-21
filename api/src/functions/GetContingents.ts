import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { loadContingent } from "./contingent-utils";

export async function GetContingents(request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> {
  const seasonCode = (request.params.season || '').trim();
  if (!seasonCode) {
    return { status: 400, jsonBody: { message: 'Season code is required.' } };
  }

  try {
    const contingent = await loadContingent(seasonCode);
    return {
      status: 200,
      jsonBody: contingent,
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: { message: error instanceof Error ? error.message : 'Could not load contingents.' },
    };
  }
}

app.http('GetContingents', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'contingents/{season}',
  handler: GetContingents,
});
