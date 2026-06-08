# Dark Lynx Protocol

Landing page premium para Dark Lynx Protocol, estudio boutique de ingeniería web.

**Stack:** SvelteKit 2 + Svelte 5 + TypeScript + SCSS + Neon (PostgreSQL serverless)

## Desarrollo

    pnpm install
    pnpm dev          # http://localhost:5173

## Variables de entorno

Copia `.env.example` a `.env` y configura `DATABASE_URL` con la connection string de Neon.

La connection string vive en `/home/lynx/docs/neondb_staging` (local, no commitear).

## Migración de base de datos

Correr el schema contra Neon con psql:

    psql "$DATABASE_URL" -f src/lib/server/schema.sql

Ver `src/lib/server/README.md` para instrucciones detalladas y cómo probar localmente.

## Deploy en Render

- **Adapter:** `@sveltejs/adapter-auto` (Render lo detecta como Node.js)
- **Environment variable requerida:** `DATABASE_URL` (Neon connection string)
- **Region recomendada:** US East (Neon está en us-east-2, minimiza latencia)
- **Build command:** `pnpm build`
- **Start command:** `node build`

## Estructura del Journal

- **Store client-side:** `src/lib/journal-store.svelte.ts` (warm-on-boot, single-flight)
- **Endpoint API:** `src/routes/api/journal/+server.ts` (GET + POST)
- **Página:** `src/routes/journal/+page.svelte` (lee del store)
- **Layout:** `src/routes/+layout.svelte` (dispara ensureLoaded() al montar)
- **Cron:** Hermes job `fd718bfd3230` genera entradas y hace POST al endpoint

## No tocar

- `wrangler.toml` — configuración de Cloudflare Turnstile para el form de contacto
- `ContactForm.svelte` — formulario de contacto (otro task)
- `/home/lynx/repos/portafolio` — portafolio legacy (no relacionado)
