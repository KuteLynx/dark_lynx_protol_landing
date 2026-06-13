# Glossary — DarkLynxProtocol

| Term | Definition |
|---|---|
| **Runes** | Svelte 5 reactive primitives ($state, $derived, $effect, $props). Used project-wide, forced via compiler option. |
| **Warm-on-boot** | Pattern where a data fetch is triggered eagerly on app mount (non-blocking) so data is available when the relevant page loads. |
| **Single-flight** | Guard that prevents duplicate in-flight requests. If a request for the same data is already pending, new callers receive the same promise. |
| **Theme Registry** | Static record of all theme definitions (colors, fonts, effects, assets, canvas config). |
| **Theme Store** | Reactive Svelte 5 rune-based store that holds the current theme ID, persists to localStorage, and applies CSS custom properties. |
| **CSS Custom Properties** | Runtime-style variables set on `:root` by the theme store. SCSS tokens reference these for theming. |
| **Neon** | Serverless PostgreSQL provider. Uses HTTP-based driver for optimal serverless performance. |
| **Turnstile** | Cloudflare's privacy-first bot detection (replaces reCAPTCHA). |
| **Hermes** | Cron job service that posts journal entries to the API periodically. |
| **Renderer** | Render.com — hosts the standalone Journal API Node.js server. |
| **INICIAR_PROTOCOLO** | Primary CTA label (mailto link). |
| **TRANSMITIR_DATOS** | Contact form submit button label. |
| **PROTOCOLO_COMPLETADO** | Contact form success message. |
| **DEFAULT_THEME_ID** | 'hacker' (Hacker Terminal theme). |
| **Core Web Vitals** | Google's performance metrics (LCP, FID/INP, CLS). The site is optimized for these. |
| **Boutique Studio** | Self-description: small, direct-client-contact engineering studio vs. large agency. |
