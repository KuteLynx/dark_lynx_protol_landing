# Brain Index — DarkLynxProtocol

## Project Overview

**DarkLynxProtocol** is the landing page and commercial website for *Dark Lynx Protocol*, a boutique web engineering studio founded by Gerardo Martínez Junco (michi). The site functions as both a portfolio and a lead-generation tool, offering services like landing pages, custom web systems, SEO audits, and secure integrations.

**Stack:** SvelteKit 2 + Svelte 5 + TypeScript + SCSS + Neon (PostgreSQL serverless)  
**Domain:** https://darklynxprotocol.com  
**Deployments:** GitHub Pages (frontend) + Render (Journal API backend)

---

## Brain Contents

| File | Description |
|---|---|
| `brain-index.md` | This file — master index of all brain documentation |
| `routing-index.md` | Maps topics/patterns to brain files for quick lookup |
| `changelog.md` | Tracks documented changes synced with git history |
| `architecture.md` | Overall architecture: deployment, data flow, layout |
| `modules/` | Module-specific documentation |
| `modules/themes.md` | Dynamic theme system (registry + store + SCSS) |
| `modules/journal.md` | Journal store, API, DB schema, cron integration |
| `modules/i18n.md` | Internationalization (Spanish-first, with English toggle) |
| `modules/contact.md` | Contact form via Cloudflare Turnstile + Worker |
| `modules/data-models.md` | Data models: navigation, services, profile, etc. |
| `flows/` | Flow documentation |
| `flows/theme-switching.md` | Theme switching flow (user action → store → CSS vars) |
| `flows/journal-loading.md` | Journal warm-on-boot loading flow |
| `flows/i18n-initialization.md` | i18n initialization flow (URL > localStorage > default) |
| `decisions/` | Architecture Decision Records |
| `decisions/0001-static-adapter.md` | ADR 0001: Use `@sveltejs/adapter-static` for GitHub Pages |
| `decisions/0002-split-deployments.md` | ADR 0002: Split frontend (GitHub Pages) from backend (Render) |
| `decisions/0003-theme-system.md` | ADR 0003: CSS custom properties-based dynamic theme system |
| `decisions/0004-warm-on-boot.md` | ADR 0004: Warm-on-boot journal fetch pattern |
| `decisions/0005-svelte-runes.md` | ADR 0005: Force Svelte 5 runes mode project-wide |
| `glossary.md` | Glossary of terms and conventions used in the project |
