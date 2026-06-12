export interface ThemeDefinition {
	id: string;
	name: string;

	colors: {
		bg: string;
		bgDeep: string;
		surfaceLow: string;
		surface: string;
		surfaceHigh: string;
		surfaceHighest: string;
		text: string;
		textMuted: string;
		textSubtle: string;
		accent: string;
		accentDim: string;
		accentSoft: string;
		border: string;
		borderSoft: string;
		danger: string;
	};

	fonts: {
		body: string;
		mono: string;
	};

	effects: {
		shadowGlow: string;
		shadowGlowStrong: string;
		glassBackground: string;
		accentRgb: string;
		glitchSecondary: string;
		globalAnimationClass: string;
		mouseLight: string;
	};

	assets: {
		profileImage: string;
	};

	loader: {
		eyebrowText: string;
		typewriterText: string;
		backgroundGradient: string;
	};

	canvas: {
		dotColor: { r: number; g: number; b: number };
		accentColor: { r: number; g: number; b: number };
		gridBorderColor: string;
		gridFillColor: string;
	};
}

export const THEMES: Record<string, ThemeDefinition> = {
	artisanal_sketchbook: {
		id: 'artisanal_sketchbook',
		name: 'Artisanal Sketchbook',
		colors: {
			bg: '#faf9f8',
			bgDeep: '#ffffff',
			surfaceLow: '#f4f3f2',
			surface: '#faf9f8',
			surfaceHigh: '#e9e8e7',
			surfaceHighest: '#e3e2e1',
			text: '#1a1c1c',
			textMuted: '#444748',
			textSubtle: '#747878',
			accent: '#dcae78',
			accentDim: '#c29a63',
			accentSoft: '#e4c49d',
			border: '#c4c7c7',
			borderSoft: 'rgba(80, 96, 111, 0.2)',
			danger: '#ba1a1a'
		},
		fonts: {
			body: '"DM Sans", sans-serif',
			mono: '"Bricolage Grotesque", sans-serif'
		},
		effects: {
			shadowGlow: 'none',
			shadowGlowStrong: 'none',
			glassBackground: 'rgba(250, 249, 248, 0.85)',
			accentRgb: '220, 174, 120',
			glitchSecondary: '#50606f',
			globalAnimationClass: '',
			mouseLight: 'transparent'
		},
		assets: {
			profileImage: 'artisanal_sketchbook'
		},
		loader: {
			eyebrowText: 'ARTISANAL_MODE',
			typewriterText: 'Sharpening pencils...',
			backgroundGradient: 'linear-gradient(180deg, #faf9f8 0%, #f4f3f2 100%)'
		},
		canvas: {
			dotColor: { r: 80, g: 96, b: 111 },
			accentColor: { r: 220, g: 174, b: 120 },
			gridBorderColor: '80, 96, 111',
			gridFillColor: '220, 174, 120'
		}
	},
	urban_night: {
		id: 'urban_night',
		name: 'Urban Night Studio',
		colors: {
			bg: '#050b14',
			bgDeep: '#02040a',
			surfaceLow: '#0f172a',
			surface: '#1e293b',
			surfaceHigh: '#334155',
			surfaceHighest: '#475569',
			text: '#f8fafc',
			textMuted: '#e2e8f0',
			textSubtle: '#94a3b8',
			accent: '#3b82f6',
			accentDim: '#2563eb',
			accentSoft: '#60a5fa',
			border: '#334155',
			borderSoft: 'rgba(51, 65, 85, 0.3)',
			danger: '#fb7185'
		},
		fonts: {
			body: '"Plus Jakarta Sans", sans-serif',
			mono: '"JetBrains Mono", monospace'
		},
		effects: {
			shadowGlow: '0 0 15px rgba(59, 130, 246, 0.15)',
			shadowGlowStrong: '0 0 25px rgba(59, 130, 246, 0.35)',
			glassBackground: 'rgba(15, 23, 42, 0.6)',
			accentRgb: '59, 130, 246',
			glitchSecondary: '#8b5cf6',
			globalAnimationClass: '',
			mouseLight: 'rgba(216, 180, 254, 0.18)'
		},
		assets: {
			profileImage: 'urban_night'
		},
		loader: {
			eyebrowText: 'SYSTEM_READY',
			typewriterText: 'Loading Urban Night...',
			backgroundGradient: 'linear-gradient(180deg, #0a0a0c 0%, #0f172a 100%)'
		},
		canvas: {
			dotColor: { r: 51, g: 65, b: 85 },
			accentColor: { r: 59, g: 130, b: 246 },
			gridBorderColor: '51, 65, 85',
			gridFillColor: '59, 130, 246'
		}
	},
	hacker: {
		id: 'hacker',
		name: 'Hacker Terminal',
		colors: {
			bg: '#131313',
			bgDeep: '#0e0e0e',
			surfaceLow: '#1c1b1b',
			surface: '#201f1f',
			surfaceHigh: '#2a2a2a',
			surfaceHighest: '#353534',
			text: '#e5e2e1',
			textMuted: '#a3b899',
			textSubtle: '#6c7e68',
			accent: '#00ff41',
			accentDim: '#00b32e',
			accentSoft: '#72ff70',
			border: '#3b4b37',
			borderSoft: 'rgba(59, 75, 55, 0.3)',
			danger: '#ffb4ab'
		},
		fonts: {
			body: '"Geist", system-ui, sans-serif',
			mono: '"JetBrains Mono", monospace'
		},
		effects: {
			shadowGlow: '0 0 15px rgba(0, 255, 65, 0.15)',
			shadowGlowStrong: '0 0 25px rgba(0, 255, 65, 0.35)',
			glassBackground: 'rgba(19, 19, 19, 0.75)',
			accentRgb: '0, 255, 65',
			glitchSecondary: 'red',
			globalAnimationClass: 'glitch-active',
			mouseLight: 'transparent'
		},
		assets: {
			profileImage: 'hacker'
		},
		loader: {
			eyebrowText: 'SECURE_SESSION',
			typewriterText: 'Dark Lynx Protocol login',
			backgroundGradient: 'radial-gradient(circle at 50% 40%, rgba(var(--accent-rgb), 0.08), transparent 34rem), linear-gradient(180deg, rgba(5, 8, 5, 0.98), rgba(3, 5, 3, 0.99))'
		},
		canvas: {
			dotColor: { r: 59, g: 75, b: 55 },
			accentColor: { r: 0, g: 255, b: 65 },
			gridBorderColor: '59, 75, 55',
			gridFillColor: '0, 255, 65'
		}
	}
};

export const DEFAULT_THEME_ID = 'hacker';
