# Manitoba Master Bowlers

## Project layout
- `client/` - Angular app (run `npm install` and `npm start` here).
- `api/` - Azure Functions backend.
- `infra/` - Dockerfiles/compose for local (`infra/local`) and prod (`infra/prod`).

## Getting started - Run w/ Docker (dev)
- `./start.sh` runs `infra/local/docker-compose.yml` to start frontend (http://localhost:4200) and backend (7071) with live reload via volume mounts.
- Local docker now includes SQL Server on `localhost:1433`.
- Copy `infra/local/.env.example` to `infra/local/.env` if you want to override the default local SA password.
- Copy `api/local.settings.example.json` to `api/local.settings.json` for local secrets/config; the example includes all keys but no real secrets.
- `api/local.settings.json` is for local runtime settings. In docker, compose still overrides `SqlConnectionString` so the backend uses the local SQL container.

## Local database refresh
- Start the local stack first so the SQL container is running.
- Run `./backup.sh` to export production to a `.bacpac` in `infra/.backups`.
- Run `./restore.sh <path-to-bacpac>` to import a `.bacpac` into the local docker SQL database.
- Create a local `api/prod.settings.json` file from `api/prod.settings.example.json`; the backup script reads the production `SqlConnectionString` from that file unless you pass one explicitly.
- The backup/restore scripts expect `SqlPackage`/`SqlPackage.exe` to be installed. If it isn't, they will stop and tell you where to get it.
- The local target database is `ManitobaMastersLocal`.

## Deploying to production
- CI/CD is handled by `.github/workflows/main.yml` on pushes to `master`.
- Frontend: builds `client` in production mode (`--configuration production --base-href /ManitobaMasterBowlers/`) and deploys `client/dist/beta` to the `gh-pages` branch (404.html is copied from index.html for SPA routing).
- Backend: builds `api` (TypeScript -> `dist`) and deploys the Azure Functions app via publish profile.
- Required GitHub secrets:
  - `TINYMCE_API_KEY` (optional for the WYSIWYG editor; injected at build time)
  - `AZURE_FUNCTIONAPP_NAME` (your Function App resource name, e.g. `manitobamastersfunc`)
  - `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` (full publish profile XML for that app)
  - `GITHUB_TOKEN` is provided by GitHub Actions automatically.
- To trigger a deploy: push to `master` (or merge PRs into `master`).

## Auth0 configuration
The app uses the dev tenant for both local and GH Pages. Ensure these settings are applied to the SPA in Auth0:
- Allowed Callback URLs:
  - `http://localhost:4200`
  - `https://caffgeek.github.io`
- Allowed Logout URLs:
  - `http://localhost:4200`
  - `https://caffgeek.github.io`
- Allowed Web Origins / Allowed Origins (CORS):
  - `http://localhost:4200`
  - `https://caffgeek.github.io`
- API (Auth0 -> APIs) settings:
  - Identifier: `https://manitobamastersfunc.azurewebsites.net/`
  - RBAC: enabled
  - Add Permissions in the Access Token: enabled
  - Permissions used by the UI: `edit:sitemap`, `edit:tournament`

## Azure Functions settings
- CORS allow list should include:
  - `http://localhost:4200`
  - `https://caffgeek.github.io`
- App settings should include `AzureWebJobsStorage`, `FUNCTIONS_WORKER_RUNTIME=node`, and `SqlConnectionString`.
