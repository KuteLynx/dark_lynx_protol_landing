# Journal Loading Flow — DarkLynxProtocol

## Flow

```
App starts (SPA navigation or full load)
        │
        ▼
Root layout (+layout.svelte) mounts
        │
        ▼
onMount() calls healthPing()
  └── Fire-and-forget GET /health → wakes Render free-tier server
        │
        ▼
User navigates to /diario
        │
        ▼
diario/+page.svelte mounts
        │
        ├── onMount() calls loadInitialEntries()
        │     │
        │     ▼
        │   state: loading = true, entries = [], offset = 0, hasMore = true
        │     │
        │     ▼
        │   fetchBatch(0) → GET /api/journal?limit=5&offset=0
        │     │
        │     ▼
        │   Response: { entries: JournalEntry[] }
        │     │
        │     ├── entries.length === 5 → hasMore = true
        │     ├── entries.length < 5  → hasMore = false
        │     └── offset += entries.length
        │     │
        │     ▼
        │   state.entries = fetched entries, loading = false
        │
        └── IntersectionObserver observes sentinel <div>
              │
              ▼
            Sentinel enters viewport (+200px rootMargin)
              │
              ▼
            loadMore() triggered
              │
              ├── inflightMore !== null → return (single-flight guard)
              ├── !hasMore → return
              └── otherwise → fetchBatch(offset)
                    │
                    ▼
                  Response: { entries: JournalEntry[] }
                    │
                    ├── Append to state.entries
                    ├── entries.length === 5 → hasMore remains true
                    ├── entries.length < 5  → hasMore = false
                    ├── offset += entries.length
                    └── loadingMore = false
                    │
                    ▼
                  Components reactively re-render
                    │
                    ├── loadingMore true  → skeleton cards shown
                    ├── moreError set     → error + retry button shown
                    ├── !hasMore          → "End of log" message shown
                    └── hasMore           → new sentinel placed, observer continues
```

## Lazy Paginated Feed Components

| Component | Behavior |
|---|---|
| Root layout `+layout.svelte` | Calls `healthPing()` on mount (wakes Render) |
| Journal page `diario/+page.svelte` | Calls `loadInitialEntries()`, sets up `IntersectionObserver` for infinite scroll |
| Journal store | Singleton, reactive, paginated, single-flight guard on `loadMore()` |
| Sentinel element | Hidden 1px `<div>` observed by `IntersectionObserver` with 200px root margin |
