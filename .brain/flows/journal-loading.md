# Journal Loading Flow — DarkLynxProtocol

## Flow

```
App starts (SPA navigation or full load)
        │
        ▼
Root layout (+layout.svelte) mounts
        │
        ▼
onMount() calls ensureLoaded()
        │
        ▼
ensureLoaded() checks:
  ├── state.entries.length > 0 || state.lastFetched !== null → return Promise.resolve() (no-op)
  ├── inflight !== null → return existing inflight promise (single-flight)
  └── otherwise → start new fetch
        │
        ▼
fetchJournal() → GET VITE_JOURNAL_API_URL (default: Render)
        │
        ▼
Response: { entries: JournalEntry[] }
        │
        ▼
state.entries = data.entries
state.lastFetched = Date.now()
        │
        ▼
Components reading journalStore reactively update
        │
        ▼
User navigates to /diario:
  ├── Data already loaded → instant render
  ├── Loading in progress → shows loading state
  └── Error state → shows error message
```

## Warm-on-boot Pattern Components

| Component | Behavior |
|---|---|
| Root layout `+layout.svelte` | Calls `ensureLoaded()` on mount |
| Journal page `diario/+page.svelte` | Reads `journalStore` (no fetch) |
| Journal store | Singleton, reactive, single-flight guard |
