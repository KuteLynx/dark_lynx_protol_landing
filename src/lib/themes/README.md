# 🎨 Theme Engine Guide

This document explains how to correctly add a new theme to Dark Lynx Protocol. The theme engine is designed to be highly scalable, allowing you to completely change the look and feel of the site without touching the core UI components.

## Step 1: Define the Theme

Open `src/lib/themes/theme-registry.ts` and add a new entry to the `THEMES` object. Your new theme must follow the `ThemeDefinition` interface:

```typescript
export const THEMES: Record<string, ThemeDefinition> = {
	// ... existing themes
	neon: {
		id: 'neon',
		name: 'Neon Synthwave',
		
		// 1. Colors
		colors: {
			bg: '#0f0f1b',
			bgDeep: '#05050f',
			surfaceLow: '#151525',
			surface: '#1c1c30',
			surfaceHigh: '#252540',
			surfaceHighest: '#303050',
			text: '#f0f0ff',
			textMuted: '#a0a0c0',
			textSubtle: '#606080',
			accent: '#ff00ff',        // Main accent color
			accentDim: '#cc00cc',
			accentSoft: '#ff66ff',
			border: '#402060',
			borderSoft: 'rgba(64, 32, 96, 0.3)',
			danger: '#ff3366'
		},

		// 2. Typography
		fonts: {
			body: '"Inter", sans-serif',
			mono: '"Fira Code", monospace'
		},

		// 3. Global Effects
		effects: {
			shadowGlow: '0 0 15px rgba(255, 0, 255, 0.15)',
			shadowGlowStrong: '0 0 25px rgba(255, 0, 255, 0.35)',
			glassBackground: 'rgba(15, 15, 27, 0.75)',
			accentRgb: '255, 0, 255', // Crucial for components that need opacity over the accent color
			glitchSecondary: '#00ffff', // Used if your animation requires a secondary color
			globalAnimationClass: 'neon-flicker' // The unique CSS class for this theme's random element animation
		},

		// 4. Assets
		assets: {
			profileImage: 'synthwave_avatar' // Key used to map the image in ProfileHero.svelte
		},

		// 5. Boot Loader
		loader: {
			eyebrowText: 'INITIALIZING_SYNTH',
			typewriterText: 'Connecting to the Grid...',
			backgroundGradient: 'linear-gradient(180deg, #05050f 0%, #150525 100%)'
		},

		// 6. Interactive Canvas Background
		canvas: {
			dotColor: { r: 64, g: 32, b: 96 },
			accentColor: { r: 255, g: 0, b: 255 },
			gridBorderColor: '64, 32, 96',
			gridFillColor: '255, 0, 255'
		}
	}
};
```

## Step 2: Add Fonts

If your theme uses new Google Fonts, you **must** add them to `src/app.html`. 

We preload all possible fonts across all themes globally to prevent a "Flash of Unstyled Text" (FOUT) when the user switches themes in real-time.

1. Open `src/app.html`
2. Locate the `<!-- Theme Fonts: ... -->` comment.
3. Append your new font family to the Google Fonts `<link>` tag.

## Step 3: Add Profile Image

Each theme can have its own profile image displayed in the `ProfileHero` section.

1. Place your new image in `src/lib/assets/` (e.g., `profile-synth.webp`).
2. Open `src/lib/components/sections/ProfileHero.svelte`.
3. Import the image at the top of the script:
   ```svelte
   import profileImgSynth from '$lib/assets/profile-synth.webp';
   ```
4. Map the key you defined in `theme.assets.profileImage` to the imported image:
   ```typescript
   const profileImages: Record<string, string> = {
       hacker: profileImgHacker,
       synthwave_avatar: profileImgSynth // <--- Map it here
   };
   ```

## Step 4: Add Custom Animations (Optional)

The `GlitchEngine.svelte` acts as a global random animation dispatcher. It occasionally applies a CSS class to random elements on the screen.

If you set `globalAnimationClass: 'neon-flicker'`, you need to define what `.neon-flicker` does in CSS:

1. Create or edit an animation file in `src/styles/effects/` (e.g., `_animations.scss`).
2. Define the class:
   ```scss
   .neon-flicker {
       animation: flicker 0.5s ease-in-out infinite alternate;
   }
   
   @keyframes flicker {
       0% { opacity: 1; }
       50% { opacity: 0.8; box-shadow: 0 0 10px var(--color-accent); }
       100% { opacity: 1; }
   }
   ```
3. If your theme does not need random animations, set `globalAnimationClass: ''`.

## That's it!

As soon as you save these changes, the new theme will automatically appear in the `ThemeSelector` dropdown in the Navbar. No further configuration is needed!
