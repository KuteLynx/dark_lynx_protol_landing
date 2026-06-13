# i18n Initialization Flow — DarkLynxProtocol

## Flow

```
Page loads (browser)
        │
        ▼
state.svelte.ts initializes:
        │
        ▼
1. Check URL search params for ?lang=es|en
   ├── Found → use it, persist to localStorage, update <html lang>
   └── Not found → go to step 2
        │
        ▼
2. Check localStorage for saved 'locale'
   ├── Found ('es' | 'en') → use it, update <html lang>
   └── Not found → go to step 3
        │
        ▼
3. Default to 'es' (Spanish-first)
   └── <html lang="es">
        │
        ▼
Components use t('key') or tObj<T>('key') reactively
        │
        ▼
User toggles language:
  1. locale.current = newLocale
  2. localStorage.setItem('locale', newLocale)
  3. document.documentElement.lang = newLocale
  4. All components using t() re-render with new translations
```

## Key Design Decisions

- **Spanish-first**: All users default to Spanish. English is opt-in.
- **No auto-detection**: Browser `navigator.language` is deliberately not used.
- **Persistence**: Locale persists in localStorage across sessions.
- **URL override**: `?lang=en` allows deep linking in English (e.g., for sharing).
- **SSR**: Only runs in browser (`$app/environment` guards).
