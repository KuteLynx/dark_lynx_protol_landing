// Cron-side journal entry persistence.
// Replaces the HTTP POST to Render: connects directly to Neon, does a
// SELECT guard, then INSERTs if today's entry is missing.
//
// Usage:
//   node scripts/upsert-journal-entry.mjs < entry.json
//   # or
//   cat entry.json | node scripts/upsert-journal-entry.mjs
//
// Required JSON fields (matches the journal_entries schema):
//   date, title_es, content_es, [title_en], [content_en], [tags], [author]
//
// Exit codes:
//   0 = inserted (or skipped, with status printed)
//   1 = fatal (DB unreachable, malformed input, etc.)
//   2 = validation rejected
//
// The script prints a one-line status and a short summary so the cron
// can see what happened in its log.

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// --- minimal .env loader (no dotenv dep) ---
try {
	const envText = await readFile(resolve(projectRoot, '.env'), 'utf8');
	for (const line of envText.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq < 0) continue;
		const key = trimmed.slice(0, eq).trim();
		let val = trimmed.slice(eq + 1).trim();
		if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
			val = val.slice(1, -1);
		}
		if (process.env[key] === undefined) process.env[key] = val;
	}
} catch {
	// .env not present — fall back to shell env
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	console.error('[upsert] FATAL: DATABASE_URL is not set in .env or shell env.');
	process.exit(1);
}

// --- date helpers (Mexico City) ---
function todayInMexicoCity() {
	const fmt = new Intl.DateTimeFormat('en-CA', {
		timeZone: 'America/Mexico_City',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	// en-CA gives YYYY-MM-DD
	return fmt.format(new Date());
}

// --- read entry JSON from stdin ---
async function readStdin() {
	return new Promise((resolveStdin, rejectStdin) => {
		let buf = '';
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', (c) => (buf += c));
		process.stdin.on('end', () => resolveStdin(buf));
		process.stdin.on('error', rejectStdin);
	});
}

function validateEntry(e) {
	const errors = [];
	if (!e || typeof e !== 'object') errors.push('entry must be a JSON object');
	if (!e.date) errors.push('date is required (YYYY-MM-DD)');
	else if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push('date must be YYYY-MM-DD');
	if (!e.title_es) errors.push('title_es is required');
	if (!e.content_es) errors.push('content_es is required');
	return errors;
}

async function main() {
	const raw = (await readStdin()).trim();
	if (!raw) {
		console.error('[upsert] FATAL: no input received on stdin. Pipe entry JSON.');
		process.exit(1);
	}

	let entry;
	try {
		entry = JSON.parse(raw);
	} catch (e) {
		console.error('[upsert] FATAL: stdin is not valid JSON:', e.message);
		process.exit(1);
	}

	const errors = validateEntry(entry);
	if (errors.length > 0) {
		console.error('[upsert] VALIDATION FAILED:');
		for (const err of errors) console.error('  -', err);
		process.exit(2);
	}

	const sql = neon(DATABASE_URL);

	// --- guard: does an entry with the same (date, title_es) already exist? ---
	// Idempotent against re-runs AND against backfills for past dates.
	const existing = await sql`
		SELECT id FROM journal_entries
		WHERE date = ${entry.date} AND title_es = ${entry.title_es}
		LIMIT 1
	`;

	if (existing.length > 0) {
		console.log(`[upsert] SKIP: entry for date=${entry.date} title_es="${entry.title_es.slice(0, 50)}" already exists (id=${existing[0].id}).`);
		console.log('[upsert] status: skipped');
		process.exit(0);
	}

	// --- insert ---
	const title_en = entry.title_en ?? null;
	const content_en = entry.content_en ?? null;
	const tags = Array.isArray(entry.tags) ? entry.tags : [];
	const author = entry.author ?? 'michi';

	const result = await sql`
		INSERT INTO journal_entries (date, title_es, title_en, content_es, content_en, tags, author)
		VALUES (${entry.date}, ${entry.title_es}, ${title_en}, ${entry.content_es}, ${content_en}, ${tags}::text[], ${author})
		ON CONFLICT (date, title_es) DO NOTHING
		RETURNING id
	`;

	if (result.length === 0) {
		console.log(`[upsert] SKIP: (date, title_es) conflict — entry already exists.`);
		console.log('[upsert] status: skipped');
		process.exit(0);
	}

	console.log(`[upsert] INSERTED id=${result[0].id} date=${entry.date}`);
	console.log('[upsert] status: inserted');
}

main().catch((err) => {
	console.error('[upsert] FATAL:', err.message ?? err);
	process.exit(1);
});
