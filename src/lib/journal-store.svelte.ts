/**
 * Journal store — singleton with warm-on-boot pattern.
 *
 * Called once from root layout on app mount. The first call to ensureLoaded()
 * triggers a single fetch to /api/journal. Subsequent calls are no-ops if
 * data is already present or a request is in-flight (single-flight guard).
 */

export interface JournalEntry {
	id: number;
	date: string;
	title_es: string;
	title_en: string | null;
	content_es: string;
	content_en: string | null;
	tags: string[];
	author: string;
}

interface JournalState {
	entries: JournalEntry[];
	loading: boolean;
	error: string | null;
	lastFetched: number | null;
}

const state: JournalState = $state({
	entries: [],
	loading: false,
	error: null,
	lastFetched: null
});

let inflight: Promise<void> | null = null;

async function fetchJournal(): Promise<void> {
	const res = await fetch('/api/journal');
	if (!res.ok) {
		throw new Error(`HTTP ${res.status}: ${await res.text()}`);
	}
	const data: { entries: JournalEntry[] } = await res.json();
	state.entries = data.entries;
	state.lastFetched = Date.now();
}

/**
 * Load journal entries from the API. Always fetches (no caching).
 * Use ensureLoaded() for the warm-on-boot pattern.
 */
export async function loadJournal(): Promise<void> {
	state.loading = true;
	state.error = null;
	try {
		await fetchJournal();
	} catch (e) {
		state.error = e instanceof Error ? e.message : 'Unknown error';
	} finally {
		state.loading = false;
	}
}

/**
 * Warm-on-boot: fetch once on first call, then never again.
 * Single-flight: if a request is already in-flight, returns the same promise.
 * If data is already loaded, returns immediately.
 */
export function ensureLoaded(): Promise<void> {
	// Already have data — skip
	if (state.entries.length > 0 || state.lastFetched !== null) {
		return Promise.resolve();
	}
	// Request already in flight — reuse it
	if (inflight) {
		return inflight;
	}
	// Start a new request
	inflight = loadJournal().finally(() => {
		inflight = null;
	});
	return inflight;
}

/** Reactive store export — components read these directly */
export const journalStore = {
	get entries() {
		return state.entries;
	},
	get loading() {
		return state.loading;
	},
	get error() {
		return state.error;
	},
	get lastFetched() {
		return state.lastFetched;
	}
};
