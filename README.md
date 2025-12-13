# Manitoba Master Bowlers

## Project layout
- `client/` – Angular app (run `npm install` and `npm start` here).
- `api/` – Azure Functions backend.
- `infra/` – Dockerfiles/compose for local (`infra/local`) and prod (`infra/prod`).

## Getting started - Run w/ Docker (dev)
- `./start.sh` runs `infra/local/docker-compose.yml` to start frontend (4200) and backend (7071) with live reload via volume mounts.

## Deploying to production
- CI/CD is handled by `.github/workflows/main.yml` on pushes to `master`.
- Frontend: builds `client` with `--base-href /ManitobaMasterBowlers/` and deploys `client/dist/manitoba-master-bowlers` to the `gh-pages` branch.
- Backend: builds `api` (TypeScript -> `dist`) and deploys the Azure Functions app via publish profile.
- Required GitHub secrets:
  - `TINYMCE_API_KEY` (optional for the WYSIWYG editor; injected at build time)
  - `AZURE_FUNCTIONAPP_NAME`
  - `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`
  - `GITHUB_TOKEN` is provided by GitHub Actions automatically.
- To trigger a deploy: push to `master` (or merge PRs into `master`).
