-- DarkLynxProtocol: Journal entries schema
-- Run against Neon: psql "$DATABASE_URL" -f src/lib/server/schema.sql

CREATE TABLE IF NOT EXISTS journal_entries (
    id          SERIAL PRIMARY KEY,
    date        DATE NOT NULL,
    title_es    TEXT NOT NULL,
    title_en    TEXT,
    content_es  TEXT NOT NULL,
    content_en  TEXT,
    tags        TEXT[] DEFAULT '{}',
    author      TEXT DEFAULT 'michi',
    created_at  TIMESTAMPTZ DEFAULT now(),
    UNIQUE (date, title_es)
);

-- Index for the main query: ORDER BY date DESC
CREATE INDEX IF NOT EXISTS idx_journal_entries_date_desc
    ON journal_entries (date DESC);
