# Server-side code — DarkLynxProtocol

## Database migration

Run the schema against Neon (requires `psql` and `DATABASE_URL` in your environment):

```bash
# From the project root:
source .env  # or export DATABASE_URL=...
psql "$DATABASE_URL" -f src/lib/server/schema.sql
```

Or paste the connection string directly:

```bash
psql "postgresql://..." -f src/lib/server/schema.sql
```

The migration is idempotent (`IF NOT EXISTS`), safe to run multiple times.

## Local development

1. Make sure `.env` exists with `DATABASE_URL=<your-neon-connection-string>`
2. Run the migration (above)
3. Start the dev server: `pnpm dev`
4. Test the endpoint:
   ```bash
   # GET all entries
   curl http://localhost:5173/api/journal

   # POST a new entry
   curl -X POST http://localhost:5173/api/journal \
     -H 'Content-Type: application/json' \
     -d '{
       "date": "2026-06-07",
       "title_es": "Primera entrada de prueba",
       "title_en": "First test entry",
       "content_es": "Contenido de prueba en español.\n\nSegundo párrafo.",
       "content_en": "Test content in English.\n\nSecond paragraph.",
       "tags": ["test", "setup"],
       "author": "michi"
     }'
   ```

## Files

- `db.ts` — Neon serverless client (HTTP driver, lazy singleton)
- `schema.sql` — Database migration (journal_entries table)
- `../journal-store.svelte.ts` — Client-side store with warm-on-boot pattern
