# Changelog — DarkLynxProtocol

## Initial bootstrapping (HEAD)

- Latest commit: `d87588b` — chore: remove .brain directory from version control
- Previous commit: `5e4abe6` — chore: add .artifacts/ and .brain/ directories to gitignore
- Base branch: `master`
- Active branches: `master`, `perf/a11y-improvements`, `perf/asset-optimizations`

### Documented commits (recent, reverse chronological)

| Commit | Type | Description |
|---|---|---|
| `d87588b` | chore | Remove .brain directory from version control |
| `5e4abe6` | chore | Add .artifacts/ and .brain/ directories to gitignore |
| `3af6767` | perf | Remove boot-loader entirely for instant page paint |
| `46d9076` | chore | Merge perf branches, fix TS type error |
| `7a9c463` | perf | Preload hero LCP fonts (covered by font optimization) |
| `9eb2519` | perf | Set immutable cache for SvelteKit assets in _headers |
| `2baa3f6` | perf | Disable particle canvas on mobile, use CSS fallback |
| `749e4ce` | devex | Enable source maps in production build |
| `e503162` | perf | Add resource hints for Render.com backend |
| `a26b68c` | perf | Reduce favicon.png from 80KB to ~5KB |
| `3824d87` | perf | Preload only active theme fonts, lazy-load others |
| `f2d1669` | perf | Convert profile/texture PNGs to WebP with fallback |
| `4562693` | a11y | Fix heading hierarchy h1 > h2 > h3 |
| `49e70a9` | a11y | Fix footer text contrast to meet WCAG AA 4.5:1 |
| `e6237de` | perf | Load Cloudflare Turnstile conditionally on contact page only |
| `dc7a7a1` | feat | Add Cloudflare Pages deployment config |
| `0c4c72a` | perf | Treeshake lucide icons, use individual imports |
| `91cf78f` | perf | Load Google Fonts non-blocking with preload+swap |
| `8a9da97` | perf | Reduce boot-loader to 400ms, show only on first visit |
| `d34b659` | feat | Implement dynamic theme system with registry and per-theme styling overrides |
| `684a8a4` | feat | Target queretaro programmer SEO |
| `5b0d255` | feat | Target affordable website SEO |
| `b29b636` | feat | Strengthen personal SEO signals |
| `5f06077` | tweak | Extend boot loader duration |
| `0adf0de` | feat | Add boot loader for initial hydration |
| `45082fc` | revert | Revert "fix: prevent home hero hydration flicker" |
| `4ede3b7` | fix | Prevent home hero hydration flicker |
| `3b9a855` | feat | Add subtle entry animations |
| `aaff608` | revert | Revert "feat: fase 1 demos + landing Brasa Norte" |
| `bfd2284` | feat | Fase 1 demos + landing Brasa Norte |
