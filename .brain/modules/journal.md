# Journal Module — DarkLynxProtocol

## Overview

A personal development journal (bitácora) with bilingual entries (Spanish/English). Entries are stored in Neon PostgreSQL and served via two API endpoints: a SvelteKit server route (for the static site at build time) and a standalone Render Node.js server (for runtime data fetching).

Journal loading uses a **lazy paginated feed** pattern:
- The root layout wakes the Render backend with a fire-and-forget health ping
- The `/diario` page loads entries in batches of 5 on mount
- An `IntersectionObserver` on a sentinel element triggers `loadMore()` when the user scrolls near the bottom (200px root margin)
- Skeleton loading, error/retry, and end-of-feed states are rendered inline

## Architecture

```
[Browser] → fetch (on scroll) → Render API /api/journal?limit=5&offset=N (GET) → Neon DB
                                                                                    ↑
[Hermes Cron] → POST → SvelteKit /api/journal (POST) → Neon DB
```

## Database Schema

Table: `journal_entries` (in `src/lib/server/schema.sql`)

| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| date | DATE NOT NULL | |
| title_es | TEXT NOT NULL | Spanish title |
| title_en | TEXT | English title (nullable) |
| content_es | TEXT NOT NULL | Spanish content |
| content_en | TEXT | English content (nullable) |
| tags | TEXT[] | Default `'{}'` |
| author | TEXT | Default `'michi'` |
| created_at | TIMESTAMPTZ | Default `now()` |

Unique constraint on `(date, title_es)` for idempotent inserts.

## Client Store (`journal-store.svelte.ts`)

- Singleton reactive store using `$state` rune
- **Paginated**: fetches batches of 5 entries (`LIMIT=5`)
- **State**: `entries`, `loading`, `error`, `offset`, `hasMore`, `loadingMore`, `moreError`
- **API**: `loadInitialEntries()` — resets state and fetches first batch from offset 0
- **API**: `loadMore()` — fetches next batch; guarded with `inflightMore` to prevent concurrent duplicate requests
- **API**: `healthPing()` — fire-and-forget GET to `/health` to wake the Render free-tier server from sleep
- Exports `journalStore` (reactive accessors for all state fields)

### Pagination

| State | Description |
|---|---|
| `offset` | Current cursor — how many entries have been fetched so far |
| `hasMore` | `true` when the last batch returned exactly `LIMIT` entries |
| `loadingMore` | `true` while a subsequent batch is being fetched |
| `moreError` | Error string from the most recent `loadMore()` call |

## API Endpoints

### SvelteKit Route (`src/routes/api/journal/+server.ts`)
- **GET**: Returns all entries `ORDER BY date DESC`
- **POST**: Inserts new entry (validates date format, required fields)
- **CORS**: Restricted to known origins (darklynxprotocol.com, localhost)
- **409**: Unique constraint violation returns conflict (idempotent)

### Render Server (`server/journal-api.mjs`)
- Standalone Node.js HTTP server (no Express)
- **GET `/api/journal?limit=N&offset=N`** — paginated entries
- **POST `/api/journal`** — insert entry
- **OPTIONS** — CORS preflight
- **GET `/health`** — health check (used by `healthPing()` to wake the server)
- CORS with same allowed origins
- Deployed via Render.com free tier (spins down on inactivity)

## Journal Page (`src/routes/diario/+page.svelte`)

- Calls `loadInitialEntries()` on mount
- Sets up `IntersectionObserver` on a hidden sentinel `<div>` to detect scroll proximity
- Renders loaded entries, then one of:
  - **Skeleton cards** (while `loadingMore` is true)
  - **Error block** with retry button (when `moreError` is set)
  - **End-of-feed message** (when `!hasMore`)
  - **Sentinel element** (when `hasMore` is true — triggers next load on intersection)

## Data Flow

1. Root layout mounts → calls `healthPing()` (wakes Render, no data fetch)
2. User navigates to `/diario`
3. Page mounts → calls `loadInitialEntries()`
4. Store fetches `GET /api/journal?limit=5&offset=0` from Render API
5. Response updates `state.entries`; `state.hasMore` is set if 5 entries returned
6. `IntersectionObserver` detects sentinel entering viewport (with 200px margin)
7. `loadMore()` fetches next batch, appends to `state.entries`, increments `offset`
8. Loop continues until `hasMore` is false (batch returned < 5 entries)

## Key Files

| File | Purpose |
|---|---|
| `src/lib/journal-store.svelte.ts` | Reactive store with lazy paginated loading |
| `src/lib/server/db.ts` | Neon SQL client (lazy singleton) |
| `src/lib/server/schema.sql` | DB schema |
| `src/routes/api/journal/+server.ts` | SvelteKit API endpoint |
| `server/journal-api.mjs` | Standalone Render server (paginated GET) |
| `scripts/upsert-journal-entry.mjs` | Script to insert entries |
| `scripts/seed-from-portafolio.mjs` | Seed script from legacy portafolio |
