# Journal Module — DarkLynxProtocol

## Overview

A personal development journal (bitácora) with bilingual entries (Spanish/English). Entries are stored in Neon PostgreSQL and served via two API endpoints: a SvelteKit server route (for the static site at build time) and a standalone Render Node.js server (for runtime data fetching).

## Architecture

```
[Browser] → fetch (on mount) → Render API /api/journal (GET) → Neon DB
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
- **Warm-on-boot**: `ensureLoaded()` called from root layout `onMount`
- **Single-flight**: in-flight requests reuse the same promise
- `loadJournal()`: fetch from API, update state
- Exports `journalStore` (entries, loading, error, lastFetched)

## API Endpoints

### SvelteKit Route (`src/routes/api/journal/+server.ts`)
- **GET**: Returns all entries `ORDER BY date DESC`
- **POST**: Inserts new entry (validates date format, required fields)
- **CORS**: Restricted to known origins (darklynxprotocol.com, localhost)
- **409**: Unique constraint violation returns conflict (idempotent)

### Render Server (`server/journal-api.mjs`)
- Standalone Node.js HTTP server (no Express)
- Same endpoints: GET, POST, OPTIONS
- Health check at `/health`
- CORS with same allowed origins
- Deployed via Render.com free tier

## Journal Page (`src/routes/diario/+page.svelte`)

- Reads from `journalStore` (entries, loading, error, lastFetched)
- Displays entries with date, title (i18n-aware), content (i18n-aware), tags

## Data Flow

1. Root layout mounts → calls `ensureLoaded()`
2. If no data cached, fetches from `VITE_JOURNAL_API_URL` (defaults to Render)
3. Response updates reactive state
4. Journal page reads from store (no additional fetch)
5. Subsequent navigations to journal page are instant

## Key Files

| File | Purpose |
|---|---|
| `src/lib/journal-store.svelte.ts` | Reactive store with warm-on-boot |
| `src/lib/server/db.ts` | Neon SQL client (lazy singleton) |
| `src/lib/server/schema.sql` | DB schema |
| `src/routes/api/journal/+server.ts` | SvelteKit API endpoint |
| `server/journal-api.mjs` | Standalone Render server |
| `scripts/upsert-journal-entry.mjs` | Script to insert entries |
| `scripts/seed-from-portafolio.mjs` | Seed script from legacy portafolio |
