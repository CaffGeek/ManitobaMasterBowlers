// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import auth_config from '../../auth_config.local.json';

const { domain, clientId, authorizationParams: { audience }, apiUri, errorPath } = auth_config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
  },
  apiUri: string;
  errorPath: string;
};

// Base path for the SPA (blank for local dev served at root)
const appBasePath = '/ManitobaMasterBowlers';

// Optional local secret file for keys (gitignored)
let tinymceApiKey = '';
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const secret = require('./tinymce.secret.json') as { tinymceApiKey?: string; apiKey?: string };
  tinymceApiKey = secret.tinymceApiKey || secret.apiKey || '';
} catch {
  tinymceApiKey = '';
}

export const environment = {
  production: false,
  apiUri: auth_config.apiUri,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
      redirect_uri: `${window.location.origin}${appBasePath}`,
    },
    errorPath,
  },
  httpInterceptor: {
    //https://github.com/auth0/auth0-angular/blob/main/EXAMPLES.md
    allowedList: [{
      uri: `${apiUri}/*`,
      allowAnonymous: true,
    }]
  },
  tinymceApiKey
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
