# Manitoba Master Bowlers

## Project layout
- `client/` – Angular app (run `npm install` and `npm start` here).
- `api/` – Azure Functions backend.
- `infra/` – Dockerfiles/compose for local (`infra/local`) and prod (`infra/prod`).

## Getting started - Run w/ Docker (dev)
- `./start.sh` runs `infra/local/docker-compose.yml` to start frontend (4200) and backend (7071) with live reload via volume mounts.
