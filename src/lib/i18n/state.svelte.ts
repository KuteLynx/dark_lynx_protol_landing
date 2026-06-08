import { browser } from '$app/environment';
import es from './es.json';
import en from './en.json';

type Locale = 'es' | 'en';
type Translations = typeof es;

// Create reactive state for locale
let currentLocale = $state<Locale>('es');

// Initialize from localStorage or browser preference
if (browser) {
	const stored = localStorage.getItem('locale') as Locale;
	if (stored === 'es' || stored === 'en') {
		currentLocale = stored;
	} else {
		const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
		currentLocale = browserLang;
	}
}

export const locale = {
	get current() {
		return currentLocale;
	},
	set current(value: Locale) {
		currentLocale = value;
		if (browser) {
			localStorage.setItem('locale', value);
			document.documentElement.lang = value;
		}
	}
};

const translations = { es, en };

// Helper to get nested translation values
function getNestedValue(obj: any, path: string): string | undefined {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function t(key: string): string {
	const currentTranslations = translations[currentLocale];
	const value = getNestedValue(currentTranslations, key);
	
	if (value === undefined) {
		console.warn(`Translation missing for key: ${key}`);
		return key; // Fallback to key
	}
	
	return value;
}

// Store complex objects (like arrays of objects) directly
export function tObj<T>(key: string): T {
	const currentTranslations = translations[currentLocale];
	const value = getNestedValue(currentTranslations, key);
	
	if (value === undefined) {
		console.warn(`Translation object missing for key: ${key}`);
		return [] as any; // Fallback
	}
	
	return value as T;
}
