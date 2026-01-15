import config from '../../auth_config.prod.json';

const { domain, clientId, authorizationParams: { audience }, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
  },
  apiUri: string;
  errorPath: string;
};

let tinymceApiKey = '';
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const secret = require('./tinymce.secret.json') as { tinymceApiKey?: string; apiKey?: string };
  tinymceApiKey = secret.tinymceApiKey || secret.apiKey || '';
} catch {
  tinymceApiKey = '';
}

export const environment = {
  production: true,
  appBasePath: '/ManitobaMasterBowlers',
  apiUri: apiUri,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== "YOUR_API_IDENTIFIER" ? { audience } : null),
      redirect_uri: window.location.origin,
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
  tinymceApiKey
};
