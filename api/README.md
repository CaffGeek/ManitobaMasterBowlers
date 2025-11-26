# Manitoba Master Bowlers API (Azure Functions)

TypeScript Azure Functions project that backs the Angular front-end. Each function lives under `src/functions` and is built to `dist/` for deployment.

## Layout
- `host.json`: global function host config (CORS headers, extension bundle).
- `local.settings.json`: local secrets (SQL connection string, Auth0 settings, etc.). Kept out of git.
- `src/functions/*.ts`: HTTP-triggered functions using the v4 programming model (code-first bindings).
- `dist/`: compiled output created by `npm run build`.

## Common scripts (run from `api/`)
- `npm install` to restore dependencies.
- `npm run build` to compile to `dist/`.
- `npm start` to run locally via Azure Functions Core Tools (`func start`).
- `npm run clean` to remove `dist/`.

## Notes
- Deploy by running Azure Functions Core Tools from this folder after a build.
- Publish excludes dev artifacts via `.funcignore` and `.gitignore`.
- Keep `local.settings.json` local; production settings are configured in Azure.
