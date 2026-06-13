import { browser } from '$app/environment';
import { THEMES, DEFAULT_THEME_ID, type ThemeDefinition } from './theme-registry';

let currentThemeId = $state(DEFAULT_THEME_ID);

if (browser) {
	const stored = localStorage.getItem('theme');
	if (stored && THEMES[stored]) {
		currentThemeId = stored;
	}
	// Apply initially
	applyTheme(currentThemeId);
}

function applyTheme(themeId: string) {
	if (!browser) return;
	const t = THEMES[themeId];
	if (!t) return;

	const root = document.documentElement;

	// Set Colors
	for (const [key, value] of Object.entries(t.colors)) {
		// Convert camelCase to kebab-case
		const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
		root.style.setProperty(`--color-${cssKey}`, value as string);
	}

	// Set Fonts
	for (const [key, value] of Object.entries(t.fonts)) {
		const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
		root.style.setProperty(`--font-${cssKey}`, value as string);
	}

	// Set Effects
	root.style.setProperty('--shadow-glow', t.effects.shadowGlow);
	root.style.setProperty('--shadow-glow-strong', t.effects.shadowGlowStrong);
	root.style.setProperty('--glass-bg', t.effects.glassBackground);
	root.style.setProperty('--accent-rgb', t.effects.accentRgb);
	root.style.setProperty('--glitch-secondary', t.effects.glitchSecondary);
	root.style.setProperty('--mouse-light', t.effects.mouseLight);
}

export const theme = {
	get current(): ThemeDefinition {
		return THEMES[currentThemeId] || THEMES[DEFAULT_THEME_ID];
	},
	get id(): string {
		return currentThemeId;
	},
	set id(newThemeId: string) {
		if (THEMES[newThemeId] && newThemeId !== currentThemeId) {
			currentThemeId = newThemeId;
			if (browser) {
				localStorage.setItem('theme', newThemeId);
				applyTheme(newThemeId);
			}
		}
	}
};
