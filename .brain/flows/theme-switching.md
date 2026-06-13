# Theme Switching Flow — DarkLynxProtocol

## Flow

```
User clicks theme selector (ThemeSelector.svelte)
        │
        ▼
Sets theme.id = 'hacker' | 'urban_night' | 'artisanal_sketchbook'
        │
        ▼
theme-store.svelte.ts: currentThemeId = newThemeId
        │
        ▼
if browser:
  1. localStorage.setItem('theme', newThemeId)
  2. applyTheme(newThemeId)
        │
        ▼
applyTheme() iterates THEMES[themeId] tokens:
  ├── Colors → --color-{name}: {value}
  ├── Fonts  → --font-{name}: {value}
  ├── Effects → --shadow-glow, --shadow-glow-strong, --glass-bg, --accent-rgb, --glitch-secondary, --mouse-light
        │
        ▼
CSS custom properties update on :root
        │
        ▼
All SCSS referencing var(--color-*) react instantly
        │
        ▼
+layout.svelte reactively updates background variant:
  ├── artisanal_sketchbook → 'paper'
  ├── urban_night → 'none'
  └── hacker → based on path ('grid'/'cyber'/'dots')
```

## Key Files

| File | Role |
|---|---|
| `src/lib/components/ui/ThemeSelector.svelte` | User-facing theme picker |
| `src/lib/themes/theme-store.svelte.ts` | Reactive store + applyTheme() |
| `src/lib/themes/theme-registry.ts` | Theme definitions |
| `src/routes/+layout.svelte` | Background variant derivation |
| `src/lib/layout/PageBackground.svelte` | Renders background variant |
