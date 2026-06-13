# Theme System — DarkLynxProtocol

## Overview

Three themes defined in `src/lib/themes/theme-registry.ts`. The system uses CSS custom properties set at runtime on `:root` via JavaScript, allowing instant theme switching without reload.

## Themes

| ID | Name | Style |
|---|---|---|
| `artisanal_sketchbook` | Artisanal Sketchbook | Light, warm tones, paper texture, DM Sans font |
| `urban_night` | Urban Night Studio | Dark, blue accent, glassmorphism, Plus Jakarta Sans |
| `hacker` (default) | Hacker Terminal | Dark, green matrix accent, Geist + JetBrains Mono |

## ThemeDefinition Interface

Each theme defines:
- **colors** (13 tokens): bg, bgDeep, surfaceLow, surface, surfaceHigh, surfaceHighest, text, textMuted, textSubtle, accent, accentDim, accentSoft, border, borderSoft, danger
- **fonts** (2 tokens): body, mono
- **effects** (8 tokens): shadowGlow, shadowGlowStrong, glassBackground, accentRgb, glitchSecondary, globalAnimationClass, mouseLight
- **assets** (1 token): profileImage — selects which profile image to show
- **canvas** (3 tokens): dotColor (r,g,b), accentColor (r,g,b), gridBorderColor, gridFillColor

## Theme Store (`theme-store.svelte.ts`)

- Singleton reactive module using `$state` rune
- Initializes from `localStorage` on browser
- `applyTheme()` iterates all theme tokens and sets them as CSS custom properties on `:root`
- Exports `theme` object with `.current` (full definition), `.id` (get/set)
- Setting `.id` persists to localStorage and re-applies CSS vars

## CSS Custom Properties Pattern

Theme tokens are converted from camelCase to kebab-case and prefixed:
- Colors: `--color-{name}`
- Fonts: `--font-{name}`
- Effects: `--shadow-glow`, `--shadow-glow-strong`, `--glass-bg`, `--accent-rgb`, `--glitch-secondary`, `--mouse-light`

SCSS files reference these via `var(--color-accent)`, etc.

## Key Files

| File | Purpose |
|---|---|
| `src/lib/themes/theme-registry.ts` | Theme definitions and `DEFAULT_THEME_ID` |
| `src/lib/themes/theme-store.svelte.ts` | Reactive store with localStorage persistence |
| `src/lib/themes/index.ts` | Barrel export |

## Theme-Specific Assets

Each theme has a corresponding profile image in `src/lib/assets/`:
- `profile-artisanal.webp` (artisanal_sketchbook)
- `profile-urban.webp` (urban_night)
- `profile-hacker.webp` (hacker)

Selected via `THEMES[id].assets.profileImage`.
