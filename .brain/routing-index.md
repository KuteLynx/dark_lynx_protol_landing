# Routing Index — DarkLynxProtocol

## Topic → File Mapping

Use this index to find which brain file documents a given topic, pattern, or concern.

| Topic / Pattern | Brain File |
|---|---|
| Architecture, deployment, stack | `architecture.md` |
| Themes, theme registry, theme store | `modules/themes.md` |
| Journal API, store, DB schema | `modules/journal.md` |
| i18n, translations, locale switching | `modules/i18n.md` |
| Contact form, Turnstile, Cloudflare Worker | `modules/contact.md` |
| Data models (nav, services, profile, etc.) | `modules/data-models.md` |
| Theme switching flow | `flows/theme-switching.md` |
| Journal warm-on-boot flow | `flows/journal-loading.md` |
| i18n initialization flow | `flows/i18n-initialization.md` |
| Svelte 5 runes mode | `decisions/0005-svelte-runes.md` |
| GitHub Pages static adapter | `decisions/0001-static-adapter.md` |
| Frontend/backend split | `decisions/0002-split-deployments.md` |
| CSS vars theme system | `decisions/0003-theme-system.md` |
| Warm-on-boot pattern | `decisions/0004-warm-on-boot.md` |
| SEO, meta tags, structured data | `architecture.md` (SEO section) |
| Deployment (CI/CD) | `architecture.md` (Deployment section) |
| SCSS architecture | `architecture.md` (SCSS section) |
| Glossary, conventions | `glossary.md` |
| Changelog | `changelog.md` |

## File → Topics

| Brain File | Topics Covered |
|---|---|
| `architecture.md` | Stack, deployment, folder structure, SCSS, SEO, security, performance |
| `modules/themes.md` | ThemeRegistry, ThemeStore, CSS custom properties, theme assets |
| `modules/journal.md` | JournalStore, ensureLoaded, journal API, schema.sql, Render API |
| `modules/i18n.md` | Locale state, translations (es.json, en.json), t() helper |
| `modules/contact.md` | ContactForm, Turnstile, Cloudflare Worker, form submission |
| `modules/data-models.md` | Static data structures (navigation, services, profile, philosophy, etc.) |
| `flows/theme-switching.md` | User clicks selector → store updates → CSS vars applied |
| `flows/journal-loading.md` | App mount → ensureLoaded → fetch → state update |
| `flows/i18n-initialization.md` | URL param > localStorage > browser > default (es) |
| `decisions/000*.md` | Individual ADRs |
| `glossary.md` | Terms: runes, warm-on-boot, single-flight, etc. |
| `changelog.md` | Commit-by-commit documented changes |
