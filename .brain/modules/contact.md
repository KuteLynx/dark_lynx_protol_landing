# Contact Module — DarkLynxProtocol

## Overview

Contact form on `/contacto` that sends messages through a Cloudflare Worker. Protected by Cloudflare Turnstile (privacy-first bot detection). 

## Architecture

```
[Browser] → POST /contacto (form submit)
              → Cloudflare Turnstile (client-side token)
              → Contact Form Cloudflare Worker
                  → Validates Turnstile token server-side
                  → Sends email via Resend API
```

## Client-Side (`ContactForm.svelte`)

- **NOT to be modified** per project rules (separate task)
- Uses Cloudflare Turnstile widget
- Form fields: name, email, subject, message
- Submit button: TRANSMITIR_DATOS / TRANSMITIENDO...
- Success: PROTOCOLO COMPLETADO
- Error: ERROR_DE_TRANSMISIÓN
- Turnstile loaded conditionally on contact page only (performance optimization)

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key (public) |
| `VITE_CONTACT_API_URL` | Cloudflare Worker endpoint |
| `TURNSTILE_SECRET_KEY` | Server-side secret (set via `wrangler secret put`) |
| `RESEND_API_KEY` | Resend API key for email sending (set via `wrangler secret put`) |

## Cloudflare Worker

Location: `workers/contact-form/`

- Wrangler-based Cloudflare Worker
- Validates Turnstile token on submission
- Sends email via Resend API
- Configured in `workers/contact-form/wrangler.toml`

## Key Files

| File | Purpose |
|---|---|
| `src/routes/contacto/+page.svelte` | Contact page |
| `workers/contact-form/` | Cloudflare Worker directory |
| `workers/contact-form/wrangler.toml` | Worker configuration |
| `wrangler.toml` (root) | Cloudflare Pages config (Turnstile) |
