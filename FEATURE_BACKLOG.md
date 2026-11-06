# Feature Backlog

This file is the source of truth for future feature work. When asked what
features remain, list every item whose status is not `Done`, grouped by
priority. Update an item's status and notes as decisions are made or work is
completed.

## Statuses

- `Idea` - captured but not yet defined
- `Ready` - sufficiently defined to begin implementation
- `In Progress` - actively being implemented
- `Blocked` - waiting on a decision, dependency, or external setup
- `Done` - completed and verified

## Backlog

### FW-001 - Automated database backups

- **Status:** Idea
- **Priority:** Critical
- **Goal:** Automatically create and retain recoverable backups of the
  production SQL database without relying on a manual process.
- **Initial scope:** Schedule backups, define retention, monitor failures, and
  document a tested restore procedure.
- **Open decisions:** Backup destination, frequency, retention period,
  encryption, alert recipient, and whether to use Azure-native backups or the
  existing export scripts.
- **Done when:** Backups run automatically, failures generate an alert, and a
  backup has been successfully restored in a test environment.

### FW-002 - Masters registration and signup forms

- **Status:** Idea
- **Priority:** High
- **Goal:** Convert the registration form from the handbook into an online form
  for Masters participants.
- **Initial scope (v1):** Public form, validation, submission confirmation, and
  delivery of the submitted details by email.
- **Future scope:** Store submissions, administrative review, exports, status
  tracking, and online payment if needed.
- **Open decisions:** Current handbook/form source, required fields, recipient
  email address or group, authentication requirements, consent/privacy wording,
  attachment needs, and submission retention.

### FW-003 - Shirt approval process

- **Status:** Idea
- **Priority:** High
- **Goal:** Allow a shirt design image to be submitted for approval and sent to
  the appropriate review group.
- **Initial scope (v1):** Submission form, image upload, submitter/contact
  information, email delivery to the approval group, and confirmation to the
  submitter.
- **Future scope:** Approval/rejection workflow, reviewer comments, submission
  history, resubmission, and audit trail.
- **Open decisions:** Approval group address, allowed file types and size,
  required metadata, who may submit, and whether uploaded files should also be
  retained in Azure storage.

### FW-004 - Average submission and event participation confirmation

- **Status:** Idea
- **Priority:** High
- **Goal:** Collect participant averages for events and confirm whether each
  participant is playing.
- **Initial scope:** Select an event, submit or verify an average, confirm or
  decline participation, and provide administrators with a clear response list.
- **Open decisions:** Who submits averages, average validation rules and source,
  submission deadlines, authentication, reminder emails, corrections, and how
  responses connect to existing bowlers, seasons, and tournaments.
- **Done when:** Administrators can see a reliable event roster with confirmed
  participation and the accepted average for every respondent.

### FW-005 - Website traffic analytics

- **Status:** In Progress
- **Priority:** Medium
- **Goal:** Add Google Analytics or an equivalent service to understand site
  traffic, popular pages, devices, and referral sources.
- **Initial scope:** Production-only analytics configuration, route-change page
  views for the Angular SPA, and access for designated administrators.
- **Future decisions:** Events beyond page views, data retention, privacy policy
  updates, and whether cookie consent is required.
- **Done when:** Production traffic and Angular route navigation appear in the
  analytics dashboard without collecting unnecessary personal information.
- **Implementation note:** Production-only GA4 SPA page-view tracking is
  configured for measurement ID `G-QF3GFZHVJ2`. It records initial loads and
  Angular route navigation without query strings or URL fragments. Local
  development remains untracked. Completion requires deploying the frontend and
  confirming page views in the GA4 Realtime report.

### FW-006 - Cross-page print styles

- **Status:** Idea
- **Priority:** Medium
- **Goal:** Make frequently printed pages readable and economical when printed
  or saved as PDF.
- **Initial scope:** Audit the site page by page, hide navigation, footer,
  sponsor ads, editor controls, and other interactive-only elements; remove
  unnecessary backgrounds and shadows; preserve useful headings; and improve
  page breaks, tables, links, and image sizing.
- **Likely pages:** Tournament results and summaries, schedules, contingents,
  bowler profiles and statistics, winners, member averages, and content pages.
- **Open decisions:** Which pages are actually printed, portrait versus
  landscape defaults, whether URLs should be printed beside links, branding or
  footer requirements, and whether any pages need a dedicated print layout or
  print button.
- **Done when:** The agreed pages have been checked in browser print preview at
  common paper sizes and produce readable output without clipped content,
  awkward blank pages, or website-only controls.

### FW-007 - MasterSeasonList lifecycle and result-upload synchronization

- **Status:** Idea
- **Priority:** High
- **Goal:** Remove the manual data-integrity gap between uploaded tournament
  results and the season-specific bowler roster/division flags.
- **Current role:** `MasterSeasonList` is not just a cache of tournament
  participation. It records season membership and Tournament, Teaching, and
  Senior eligibility flags; it is also needed for bowlers who are eligible in a
  season but have no uploaded results, including older contingent-only seasons.
  Member averages and the season bowler administration page currently read it.
- **Recommended direction:** Keep the season-membership concept (possibly rename
  the table to make its purpose clearer), and make result uploads upsert missing
  season rows and set the applicable division flag inferred from the tournament.
  Uploads must not clear flags that were set manually.
- **Investigation:** Confirm every read/write path, document which fields are
  authoritative versus derived, identify duplicate or orphaned rows, and decide
  whether the result upload and season-row update should use one transaction.
- **Data safeguards:** Add or verify a unique constraint on
  `(BowlerId, SeasonYear)`, validate season and bowler references, account for
  canonical bowler IDs without rewriting historical result ownership, and add a
  one-time reconciliation script for existing results.
- **Alternative:** Remove the table only if explicit season eligibility is
  moved to a replacement model. Deriving solely from tournament results would
  lose eligible bowlers who did not participate in an uploaded event.
- **Done when:** Uploading or replacing event results leaves every participant
  represented in the correct season/division roster, manual eligibility remains
  intact, existing data has been reconciled, and all dependent screens and
  queries use a clearly documented source of truth.

## Completed

Move completed items here or leave them above with `Status: Done`. Preserve the
feature ID and final implementation notes so decisions remain traceable.
