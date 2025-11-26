import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as jwt from "jsonwebtoken";

export async function WhoAmI(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const headers = Object.fromEntries(request.headers.entries());
    const token = headers["authorization"].replace("Bearer ", "");
    const headerKeys = Object.keys(headers);

    var username = extractUsername(token);

    return {
        status: 200,
        body: JSON.stringify(headerKeys),
    };
};

function extractUsername(token) {
    const decodedToken = jwt.decode(token);
    return decodedToken.sub;
}

app.http('WhoAmI', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'whoami',
    handler: WhoAmI,
});
