# ADR 0005: Force Svelte 5 Runes Mode Project-Wide

**Status:** Accepted  
**Date:** 2025-2026

## Context

Svelte 5 introduces "runes" (`$state`, `$derived`, `$effect`, `$props`) as a new reactivity model. By default, SvelteKit allows mixing runes mode and legacy mode, which can lead to confusion and subtle bugs.

## Decision

Force runes mode for all project files (excluding `node_modules`) via Svelte config:

```javascript
compilerOptions: {
  runes: ({ filename }) => 
    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
}
```

## Consequences

- All `.svelte` and `.svelte.ts` files must use runes syntax
- `$state` for reactive state, `$derived` for computed values, `$effect` for side effects
- `let { children } = $props()` for component props (snippets pattern)
- `{@render children()}` for slot content
- Legacy `export let`, `$:`, `{#if}` patterns are disallowed
- Clean migration path to Svelte 6 (which will make runes the only mode)
