# AGENTS.md — ManitobaMasterBowlers

Use this file as the running context for app architecture, conventions, and
cross-cutting decisions. If a change affects multiple areas or becomes a new
standard, add/update a note here.

## Repo Layout
- `client/`: Angular app
- `api/`: Azure Functions (TypeScript)
- `infra/`: local docker + scripts

## Build/Run
- Frontend: `client` (Angular)
- Backend: `api` (Azure Functions Core Tools)
- Local settings: `api/local.settings.json` (do not commit secrets)

## API Notes
- Functions live in `api/src/functions/*` and must be registered in
  `api/src/functions/index.ts`.
- SQL bindings use `SqlConnectionString`.
- Auth settings via app settings: `Auth0Domain`, `Auth0Audience`.
- Media storage settings: `MediaContainerName`, `MediaStorageConnectionString`
  (container `site-media`).

## API Routes (from `app.http` declarations)
- `POST /api/announcements` — CreateAnnouncement
- `GET /api/announcements` — GetAnnouncements
- `PUT /api/announcements/{id:int}` — UpdateAnnouncement
- `DELETE /api/announcements/{id:int}` — DeleteAnnouncement
- `POST /api/bowlerseasons/{season}` — AddBowlerSeason
- `GET /api/bowlerseasons/{season}` — GetBowlerSeasons
- `PUT /api/bowlerseasons/{season}/{bowlerId:int}` — UpdateBowlerSeason
- `DELETE /api/bowlerseasons/{season}/{bowlerId:int}` — DeleteBowlerSeason
- `GET /api/bowlers` — GetBowlers
- `PUT /api/bowlers/{id:int}` — UpdateBowler
- `GET /api/bowlerresults/{id:int?}` — GetBowlerResults
- `GET /api/contentblocks/{key?}` — GetContentBlocks
- `POST /api/contentblocks/save` — SaveContentBlock
- `GET /api/memberaverages` — GetMemberAverages
- `GET /api/media` — ListMedia
- `POST /api/media/upload` — UploadMedia
- `DELETE /api/media/{name}` — DeleteMedia
- `GET /api/schedule` — GetSchedule
- `GET /api/seasons` — GetSeasons
- `POST /api/seasons` — CreateSeason
- `GET /api/tournaments` — GetTournaments
- `POST /api/tournaments` — CreateTournament
- `PUT /api/tournaments/{id:int}` — UpdateTournament
- `DELETE /api/tournaments/{id:int}` — DeleteTournament
- `GET /api/tournamentresults/{id:int?}` — GetTournamentResults
- `PUT /api/tournamentresults/{id:int?}` — PutTournamentResults
- `POST /api/tournamentresults/{id:int?}/delete` — DeleteTournamentResults
- `GET /api/winners` — GetStarWinners
- `GET /api/whoami` — WhoAmI
- `POST /api/whoami` — WhoAmI

## Key Features
- Content blocks + sitemap are stored as a JSON content block (key planned:
  `_sitemap`).
- Media upload/list/delete via `/api/media/*`.
- Member averages endpoint: `GET /api/memberaverages` (public).

## Permissions (Auth0)
- `edit:tournament` (results upload/edit)
- `edit:bowler`
- `create:season`
- `edit:content`
- `edit:schedule`
- `delete:media`
- `edit:announcements`
- `edit:securecontent` (can set page permissions)

## Frontend Conventions
- CSV export helper: `client/src/app/utils/export-to-csv.ts`.
- Material tables: sortable + sticky headers.
- FontAwesome icons via `app.module.ts` (add to library if needed).

## Update Triggers (keep this file current)
Add a note here when you make a cross-cutting change:
- New permission or auth rule.
- New global UI pattern (tables, forms, toasts, banners).
- New API endpoints or route naming conventions.
- Changes to sitemap/content block conventions (slug, key names).
- New storage or external service settings (media, Auth0, etc).
