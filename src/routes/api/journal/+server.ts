import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sql } from '$lib/server/db';

const ALLOWED_ORIGINS = new Set([
	'https://darklynxprotocol.com',
	'https://www.darklynxprotocol.com',
	'http://localhost:5173',
	'http://localhost:4173'
]);

function corsHeaders(origin: string | null): HeadersInit {
	const headers: Record<string, string> = {
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		Vary: 'Origin'
	};

	if (origin && ALLOWED_ORIGINS.has(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
	}

	return headers;
}

export const OPTIONS: RequestHandler = async ({ request }) => {
	return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
};

/**
 * GET /api/journal
 * Returns all journal entries ordered by date DESC.
 */
export const GET: RequestHandler = async ({ request }) => {
	const headers = corsHeaders(request.headers.get('origin'));

	try {
		const rows = await sql`
			SELECT id, date, title_es, title_en, content_es, content_en, tags, author
			FROM journal_entries
			ORDER BY date DESC
		`;
		return json({ entries: rows }, { headers });
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Database query failed';
		console.error('[GET /api/journal]', message);
		return json({ error: 'Internal server error', details: message }, { status: 500, headers });
	}
};

/**
 * POST /api/journal
 * Insert a new journal entry. Used by the Hermes cron job.
 * Idempotent: returns 409 if an entry with the same (date, title_es) already exists.
 *
 * Expected payload:
 * {
 *   date: string (YYYY-MM-DD),
 *   title_es: string,
 *   title_en?: string,
 *   content_es: string,
 *   content_en?: string,
 *   tags?: string[],
 *   author?: string
 * }
 */
export const POST: RequestHandler = async ({ request }) => {
	const headers = corsHeaders(request.headers.get('origin'));
	let body: {
		date?: string;
		title_es?: string;
		title_en?: string;
		content_es?: string;
		content_en?: string;
		tags?: string[];
		author?: string;
	};

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400, headers });
	}

	// Validate required fields
	const { date, title_es, content_es } = body;
	if (!date || !title_es || !content_es) {
		return json(
			{ error: 'Missing required fields: date, title_es, content_es' },
			{ status: 400, headers }
		);
	}

	// Validate date format
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return json({ error: 'Invalid date format. Expected YYYY-MM-DD' }, { status: 400, headers });
	}

	const title_en = body.title_en ?? null;
	const content_en = body.content_en ?? null;
	const tags = body.tags ?? [];
	const author = body.author ?? 'michi';

	try {
		const result = await sql`
			INSERT INTO journal_entries (date, title_es, title_en, content_es, content_en, tags, author)
			VALUES (${date}, ${title_es}, ${title_en}, ${content_es}, ${content_en}, ${tags}::text[], ${author})
			RETURNING id, date, title_es, title_en, content_es, content_en, tags, author
		`;
		const rows = result as unknown as Array<Record<string, unknown>>;
		return json({ entry: rows[0] }, { status: 201, headers });
	} catch (err) {
		// Unique violation (date + title_es) = 409 Conflict
		if (err instanceof Error && 'code' in err && (err as { code: string }).code === '23505') {
			return json(
				{ error: 'Entry already exists for this date and title (idempotent)' },
				{ status: 409, headers }
			);
		}
		const message = err instanceof Error ? err.message : 'Insert failed';
		console.error('[POST /api/journal]', message);
		return json({ error: 'Internal server error', details: message }, { status: 500, headers });
	}
};
