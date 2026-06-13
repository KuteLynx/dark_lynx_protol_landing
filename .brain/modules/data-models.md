# Data Models — DarkLynxProtocol

## Static Content Data

All static data lives in `src/lib/data/` as JavaScript modules exporting plain data structures. These are consumed by Svelte components at build time (prerendered).

### Navigation (`navigation.js`)

```typescript
navigationItems: Array<{ label: string, href: string }>
ctaConfig: { label: 'INICIAR_PROTOCOLO', href: 'mailto:contact@darklynxprotocol.com' }
```

Routes: Inicio(/), Servicios(/servicios), Filosofía(/filosofia), Sobre Mí(/sobre-mi)

### Services (`services.js`)

- `servicePreviews`: 3 items for home page preview (icon, title, description)
- `serviceModules`: 4 full service descriptions with tags

### Philosophy (`philosophy.js`)

- `principles`: 4 core principles with number, title, description, span
- `comparisonData`: traditional agency vs boutique studio comparison
- `manifestoQuote`: Quote block

### Profile (`profile.js`)

- `profileInfo`: name, role, bio, systemStatus, currentFocus, trajectory
- Trajectory is an array of career milestones

### Tech Stack (`tech-stack.js`)

- `techStack`: 10 technologies with name and icon identifier

### Social Links (`social-links.js`)

- Social media/profile links

### Icon Registry (`icon-registry.ts`)

- Maps icon names to Lucide icon components for dynamic rendering
- Treeshaken: only used icons are imported

### Journal Access (`journal-access.svelte.ts`)

- Wrapper around the journal store for page-level access patterns

## i18n Data (`src/lib/i18n/`)

- `es.json` and `en.json`: Full translation trees
- `state.svelte.ts`: Reactive locale state with `t()` and `tObj()` helpers

## Component-Section Mapping

| Data File | Used By |
|---|---|
| `navigation.js` | `Navbar.svelte` |
| `services.js` | `ServicesPreviewSection.svelte`, `ServiceModulesSection.svelte` |
| `philosophy.js` | `PrinciplesBentoSection.svelte`, `ComparisonSplitSection.svelte`, `QuoteBlock.svelte` |
| `profile.js` | `ProfileHero.svelte`, `BioBentoSection.svelte` |
| `tech-stack.js` | `TechStackSection.svelte` |
| `social-links.js` | `Footer.svelte` |
| `icon-registry.ts` | Multiple components (dynamic icon rendering) |
| `journal-access.svelte.ts` | Journal page |
