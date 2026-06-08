// ONE-SHOT MIGRATION: portafolio/public/journal/entries.json -> Neon
// Reads the legacy static JSON and inserts each entry into the journal_entries
// table. Safe to re-run: uses ON CONFLICT DO NOTHING (no duplicates).
//
// Run with:
//   node scripts/seed-from-portafolio.mjs
//
// Requires DATABASE_URL in .env (or shell env). The script loads .env from
// the project root manually since we are not inside SvelteKit.
//
// After successful run, this file can be deleted.

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

// --- minimal .env loader (no dotenv dependency) ---
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
try {
	const envText = await readFile(resolve(projectRoot, '.env'), 'utf8');
	for (const line of envText.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq < 0) continue;
		const key = trimmed.slice(0, eq).trim();
		let val = trimmed.slice(eq + 1).trim();
		// strip surrounding quotes if present
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
	console.error('[seed] ERROR: DATABASE_URL is not set. Add it to .env or export it.');
	process.exit(1);
}

const LEGACY_JSON = '/home/lynx/repos/portafolio/public/journal/entries.json';

async function main() {
	const sql = neon(DATABASE_URL);

	const raw = await readFile(LEGACY_JSON, 'utf8');
	const data = JSON.parse(raw);
	const entries = Array.isArray(data) ? data : data.entries;

	if (!Array.isArray(entries) || entries.length === 0) {
		console.error('[seed] ERROR: no entries found in', LEGACY_JSON);
		process.exit(1);
	}

	console.log(`[seed] Found ${entries.length} entries in legacy JSON.`);

	let inserted = 0;
	let skipped = 0;
	let failed = 0;

	for (const e of entries) {
		const date = e.date;
		const title_es = e.title?.es ?? null;
		const title_en = e.title?.en ?? null;
		const content_es = e.content?.es ?? null;
		const content_en = e.content?.en ?? null;
		const tags = Array.isArray(e.tags) ? e.tags : [];
		const author = e.author ?? 'michi';

		if (!date || !title_es || !content_es) {
			console.warn(`[seed] SKIP malformed entry id=${e.id}: missing date/title_es/content_es`);
			skipped++;
			continue;
		}

		try {
			const result = await sql`
				INSERT INTO journal_entries (date, title_es, title_en, content_es, content_en, tags, author)
				VALUES (${date}, ${title_es}, ${title_en}, ${content_es}, ${content_en}, ${tags}::text[], ${author})
				ON CONFLICT (date, title_es) DO NOTHING
				RETURNING id
			`;
			if (result.length > 0) {
				inserted++;
				console.log(`[seed]   + ${date} :: ${title_es.slice(0, 60)}`);
			} else {
				skipped++;
				console.log(`[seed]   = ${date} :: ${title_es.slice(0, 60)}  (already existed)`);
			}
		} catch (err) {
			failed++;
			console.error(`[seed]   ! ${date} :: ${title_es.slice(0, 60)}  FAILED:`, err.message);
		}
	}

	console.log('');
	console.log('[seed] Done.');
	console.log(`[seed]   inserted: ${inserted}`);
	console.log(`[seed]   skipped:  ${skipped}  (duplicates or malformed)`);
	console.log(`[seed]   failed:   ${failed}`);

	if (failed > 0) process.exit(2);
}

main().catch((err) => {
	console.error('[seed] Fatal error:', err);
	process.exit(1);
});
