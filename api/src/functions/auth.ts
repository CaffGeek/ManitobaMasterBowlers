import { HttpRequest, HttpResponseInit } from "@azure/functions";
import * as jwt from "jsonwebtoken";
const jwksClient = require("jwks-rsa");

type JwtPayload = jwt.JwtPayload & { permissions?: string[] };

const getConfig = () => {
  const domain = (process.env.Auth0Domain || '').trim();
  const audience = (process.env.Auth0Audience || '').trim();
  if (!domain || !audience) {
    return null;
  }
  return { domain, audience };
};

const getToken = (request: HttpRequest) => {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  return header.slice(7).trim();
};

export async function requirePermission(request: HttpRequest, permission: string): Promise<HttpResponseInit | null> {
  const config = getConfig();
  if (!config) {
    return { status: 500, jsonBody: { message: "Auth0Domain/Auth0Audience are not configured." } };
  }

  const token = getToken(request);
  if (!token) {
    return { status: 401, jsonBody: { message: "Missing bearer token." } };
  }

  const decoded = jwt.decode(token, { complete: true }) as { header?: { kid?: string } } | null;
  const kid = decoded?.header?.kid;
  if (!kid) {
    return { status: 401, jsonBody: { message: "Invalid token header." } };
  }

  const client = jwksClient({
    jwksUri: `https://${config.domain}/.well-known/jwks.json`,
  });

  let payload: JwtPayload;
  try {
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    payload = jwt.verify(token, signingKey, {
      audience: config.audience,
      issuer: `https://${config.domain}/`,
      algorithms: ["RS256"],
    }) as JwtPayload;
  } catch {
    return { status: 401, jsonBody: { message: "Token verification failed." } };
  }

  const permissions = payload.permissions || [];
  if (!permissions.includes(permission)) {
    return { status: 403, jsonBody: { message: "Forbidden." } };
  }

  return null;
}
