# Architecture — DarkLynxProtocol

## Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 2 |
| UI Runtime | Svelte 5 (runes mode) |
| Language | TypeScript |
| Styles | SCSS with tokens, breakpoints, mixins |
| Database | Neon (serverless PostgreSQL) |
| Frontend Hosting | GitHub Pages (static) |
| Backend API Hosting | Render (Node.js, free tier) |
| Contact Form Backend | Cloudflare Workers |
| Bot Protection | Cloudflare Turnstile |
| Package Manager | pnpm 11 |
| Build Tool | Vite 8 |

## Deployment Architecture

```
┌────────────────────────────────────────────────────┐
│ GitHub Pages (static)                              │
│  ├── / (home)                                     │
│  ├── /servicios                                   │
│  ├── /filosofia                                   │
│  ├── /sobre-mi                                    │
│  ├── /contacto                                    │
│  ├── /diario (journal)                            │
│  └── /servicios/landing-pages                     │
│                                                    │
│  Serves: SvelteKit prerendered static files        │
│  CNAME: darklynxprotocol.com                       │
│  Deploy: .github/workflows/deploy.yml              │
└──────────────────────┬─────────────────────────────┘
                       │
                       │ GET /api/journal (fetch on mount)
                       ▼
┌────────────────────────────────────────────────────┐
│ Render (Node.js)                                   │
│  ├── /health                                       │
│  └── /api/journal (GET, POST)                      │
│                                                    │
│  Standalone Express-less HTTP server                │
│  Connects to Neon PostgreSQL                        │
│  CORS restricted to known origins                   │
│  Health check configured at /health                 │
└──────────────────────┬─────────────────────────────┘
                       │
                       │ SQL queries
                       ▼
┌────────────────────────────────────────────────────┐
│ Neon (Serverless PostgreSQL)                       │
│  └── journal_entries table                         │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ Cloudflare Workers                                 │
│  └── contact-form endpoint                         │
│      ├── POST form data                            │
│      ├── Turnstile token validation                │
│      └── Email via Resend API                      │
└────────────────────────────────────────────────────┘
```

## Folder Structure (src/)

```
src/
├── app.html              # Root HTML shell with SEO meta, LD+JSON, font preloading
├── app.d.ts              # Global type declarations
├── lib/
│   ├── assets/           # Static images (profile, favicon, textures)
│   ├── components/
│   │   ├── sections/     # Page-level section components (HomeHero, BioBento, etc.)
│   │   ├── ui/           # Atomic UI components (Button, Card, Badge, etc.)
│   │   └── SeoHead.svelte # Per-page SEO head manager
│   ├── data/             # Static content data (navigation, services, profile, etc.)
│   ├── i18n/             # Internationalization (es.json, en.json, state)
│   ├── journal-store.svelte.ts  # Journal reactive store with warm-on-boot
│   ├── layout/           # Layout components (Navbar, Footer, SiteLayout, etc.)
│   ├── server/           # Server-side code (db.ts, schema.sql)
│   └── themes/           # Dynamic theme system (registry, store)
├── routes/
│   ├── +layout.svelte    # Root layout: mouse trail, background, journal init
│   ├── +layout.ts        # Exports prerender = true
│   ├── +page.svelte      # Home page
│   ├── api/journal/+server.ts  # Journal GET/POST endpoint
│   ├── contacto/+page.svelte   # Contact page
│   ├── diario/+page.svelte     # Journal page
│   ├── filosofia/+page.svelte  # Philosophy page
│   ├── servicios/+page.svelte  # Services page
│   ├── servicios/landing-pages/+page.svelte # Landing pages sub-page
│   └── sobre-mi/+page.svelte   # About page
├── styles/
│   ├── abstracts/        # SCSS tokens, breakpoints, mixins, z-index
│   ├── base/             # Reset, global, typography
│   ├── effects/          # Backgrounds, terminal, glow, animations, glitch
│   ├── layout/           # Container, section, grid
│   └── utilities/        # Flow, visually-hidden, interaction
```

## SCSS Architecture

SCSS uses `@use` (no `@import`) with a token-based design system:

- **Abstracts/tokens**: Design tokens (colors, spacing, fonts) mapped to CSS custom properties
- **Abstracts/breakpoints**: Responsive breakpoint mixins
- **Abstracts/mixins**: Reusable SCSS mixins
- **Abstracts/z-index**: Z-index scale
- **Base**: Reset, global styles, typography scale
- **Effects**: Visual effects (glow, terminal, glitch, backgrounds)
- **Layout**: Grid, container, section layouts
- **Utilities**: Helper classes (flow, visually hidden, interaction)

Colors, fonts, and effects are overridden at runtime via CSS custom properties set by the theme system.

## SEO Strategy

- Full JSON-LD structured data (WebSite + Person + ProfessionalService)
- Per-page Open Graph and meta tags via `SeoHead.svelte`
- Spanish-first SEO targeting "programador en Querétaro", "páginas web baratas"
- `sitemap.xml` and `robots.txt` in static/
- Core Web Vitals optimization as a selling point
- Semantic heading hierarchy (h1 > h2 > h3)

## Security

- `_headers` sets: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- CORS restricted to known origins on both SvelteKit endpoint and Render API
- Contact form protected by Cloudflare Turnstile
- Database credentials via environment variables only

## Performance

- Static prerendering (`export const prerender = true`)
- Immutable cache headers for assets and woff2 fonts
- Font preloading with `onload="this.rel='stylesheet'"`
- DNS-prefetch and preconnect for backend origin
- WebP images with PNG fallbacks
- Treeshaken Lucide icon imports
- Particle canvas disabled on mobile (CSS fallback)
- Lazy-loaded non-active theme fonts
- Reduced favicon size (80KB → ~5KB)
- No boot-loader (removed for instant paint)
- Source maps enabled in production for debugging
