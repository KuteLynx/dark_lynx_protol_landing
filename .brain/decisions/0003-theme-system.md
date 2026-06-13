# ADR 0003: CSS Custom Properties-Based Dynamic Theme System

**Status:** Accepted  
**Date:** 2025-2026

## Context

The site needs multiple visual themes (light sketchbook, dark studio, hacker terminal) that users can switch between at runtime. Themes should persist across sessions and apply instantly without page reload.

## Decision

Implement a theme system with:

1. **Theme Registry**: Static TypeScript record of theme definitions (colors, fonts, effects, assets, canvas config)
2. **Theme Store**: Svelte 5 `$state` rune-based module that holds current theme ID, persists to localStorage, and applies CSS custom properties
3. **CSS Custom Properties**: All theme tokens are applied as CSS vars on `:root` at runtime
4. **SCSS Tokens Reference CSS Vars**: SCSS design tokens use `var(--color-*)` for theming

## Consequences

- Instant theme switching (no page reload, no JS framework rerender)
- Themes persist in localStorage
- New themes can be added by extending the registry
- All SCSS must reference CSS vars rather than hardcoded values
- Theme switching is handled entirely client-side
- Non-active theme fonts are lazy-loaded (performance optimization)
