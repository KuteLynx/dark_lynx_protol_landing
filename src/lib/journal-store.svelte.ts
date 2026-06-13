/**
 * Journal store — paginated feed with explicit initial load.
 *
 * The root layout calls healthPing() on mount to wake the Render server.
 * The /diario page calls loadInitialEntries() and observes a sentinel to
 * trigger loadMore() for subsequent batches.
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
	offset: number;
	hasMore: boolean;
	loadingMore: boolean;
	moreError: string | null;
}

const LIMIT = 5;

const state: JournalState = $state({
	entries: [],
	loading: false,
	error: null,
	offset: 0,
	hasMore: true,
	loadingMore: false,
	moreError: null
});

let inflightMore: Promise<void> | null = null;

const BASE_URL =
	(import.meta.env.VITE_JOURNAL_API_URL || 'https://dark-lynx-protol-landing.onrender.com/api/journal').replace(
		/\/api\/journal\/?$/,
		''
	);

async function fetchBatch(offset: number): Promise<JournalEntry[]> {
	const res = await fetch(`${BASE_URL}/api/journal?limit=${LIMIT}&offset=${offset}`);
	if (!res.ok) {
		throw new Error(`HTTP ${res.status}: ${await res.text()}`);
	}
	const data: { entries: JournalEntry[] } = await res.json();
	return data.entries;
}

/**
 * Fire-and-forget health ping to wake the backend server.
 */
export function healthPing(): void {
	fetch(`${BASE_URL}/health`).catch(() => {});
}

/**
 * Load the first batch of journal entries. Resets pagination state.
 */
export async function loadInitialEntries(): Promise<void> {
	state.loading = true;
	state.error = null;
	state.moreError = null;
	state.entries = [];
	state.offset = 0;
	state.hasMore = true;

	try {
		const entries = await fetchBatch(0);
		state.entries = entries;
		state.hasMore = entries.length === LIMIT;
		state.offset = entries.length;
	} catch (e) {
		state.error = e instanceof Error ? e.message : 'Unknown error';
	} finally {
		state.loading = false;
	}
}

/**
 * Load the next batch of journal entries. Guarded against concurrent calls.
 */
export async function loadMore(): Promise<void> {
	if (inflightMore || state.loading || !state.hasMore) {
		return;
	}

	state.loadingMore = true;
	state.moreError = null;

	inflightMore = fetchBatch(state.offset)
		.then((entries) => {
			state.entries = [...state.entries, ...entries];
			state.hasMore = entries.length === LIMIT;
			state.offset += entries.length;
		})
		.catch((e) => {
			state.moreError = e instanceof Error ? e.message : 'Unknown error';
		})
		.finally(() => {
			state.loadingMore = false;
			inflightMore = null;
		});

	return inflightMore;
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
	get offset() {
		return state.offset;
	},
	get hasMore() {
		return state.hasMore;
	},
	get loadingMore() {
		return state.loadingMore;
	},
	get moreError() {
		return state.moreError;
	}
};
