# ADR 0001: Use `@sveltejs/adapter-static` for GitHub Pages

**Status:** Accepted  
**Date:** 2025-2026 (project inception)

## Context

The site needs to be hosted on GitHub Pages (free static hosting). SvelteKit supports multiple adapters for different deployment targets.

## Decision

Use `@sveltejs/adapter-static` with:
- `pages: 'build'`
- `assets: 'build'`
- `fallback: '404.html'` (for SPA-like handling on GitHub Pages)
- `strict: false`

All routes are prerendered (`export const prerender = true` in root layout).

## Consequences

- Fully static output, no server-side rendering at runtime
- Journal data is fetched client-side from the Render API (not at build time)
- GitHub Pages deploy via GitHub Actions workflow
- SPA fallback page (404.html) handles direct navigation to prerendered routes
