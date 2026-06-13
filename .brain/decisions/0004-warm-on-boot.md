# ADR 0004: Warm-on-Boot Journal Fetch Pattern

**Status:** Superseded by `01abc34` (lazy paginated feed)  
**Date:** 2025-2026 (applied), 2026-06-13 (superseded)

## Context

The journal page needs data from the Render API. If fetching starts only when the user navigates to `/diario`, there's a visible loading delay. The site is a SPA (static SvelteKit with client-side navigation), so data can be fetched eagerly on app start.

## Decision

Implement a "warm-on-boot" pattern:

1. Root layout calls `ensureLoaded()` on mount
2. `ensureLoaded()` fetches journal data once
3. Single-flight guard prevents duplicate concurrent requests
4. Subsequent calls with data already loaded return immediately
5. The journal page reads from the shared reactive store

## Consequences

- Journal data starts loading immediately when any page of the app loads
- Navigation to `/diario` is instant (no loading spinner for data)
- One API call per session (or until page refresh)
- Slight overhead on initial page load (one extra fetch)
- Same pattern can be reused for other eagerly-loaded data

## Why Superseded

The warm-on-boot pattern was replaced by a lazy paginated feed (`01abc34`) because:

- The Render free tier spins down on inactivity, causing first-load delays regardless of warm-on-boot
- Lazy pagination reduces initial payload (5 entries instead of all)
- Infinite scroll with `IntersectionObserver` provides a smoother UX for a growing entry count
- The root layout now fires a lightweight `/health` ping to wake Render instead of fetching full data
- The full fetch is deferred until the user actually visits `/diario`
