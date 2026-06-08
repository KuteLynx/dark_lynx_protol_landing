import { createServer } from 'node:http';
import { neon } from '@neondatabase/serverless';

const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL;
const ALLOWED_ORIGINS = new Set([
	'https://darklynxprotocol.com',
	'https://www.darklynxprotocol.com',
	'http://localhost:5173',
	'http://localhost:4173'
]);

let sql;

function getSql() {
	if (!DATABASE_URL) {
		throw new Error('DATABASE_URL environment variable is not set');
	}
	if (!sql) {
		sql = neon(DATABASE_URL);
	}
	return sql;
}

function corsHeaders(origin) {
	const headers = {
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin'
	};

	if (origin && ALLOWED_ORIGINS.has(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
	}

	return headers;
}

function sendJson(res, status, payload, extraHeaders = {}) {
	res.writeHead(status, {
		'Content-Type': 'application/json; charset=utf-8',
		...extraHeaders
	});
	res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
	return new Promise((resolve, reject) => {
		let raw = '';
		req.setEncoding('utf8');
		req.on('data', chunk => {
			raw += chunk;
			if (raw.length > 1_000_000) {
				reject(new Error('Request body too large'));
				req.destroy();
			}
		});
		req.on('end', () => {
			try {
				resolve(JSON.parse(raw || '{}'));
			} catch {
				reject(new Error('Invalid JSON body'));
			}
		});
		req.on('error', reject);
	});
}

async function handleGet(res, headers) {
	try {
		const rows = await getSql()`
			SELECT id, date, title_es, title_en, content_es, content_en, tags, author
			FROM journal_entries
			ORDER BY date DESC
		`;
		sendJson(res, 200, { entries: rows }, headers);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Database query failed';
		console.error('[GET /api/journal]', message);
		sendJson(res, 500, { error: 'Internal server error', details: message }, headers);
	}
}

async function handlePost(req, res, headers) {
	let body;

	try {
		body = await readJsonBody(req);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Invalid JSON body';
		sendJson(res, 400, { error: message }, headers);
		return;
	}

	const { date, title_es, content_es } = body;
	if (!date || !title_es || !content_es) {
		sendJson(res, 400, { error: 'Missing required fields: date, title_es, content_es' }, headers);
		return;
	}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		sendJson(res, 400, { error: 'Invalid date format. Expected YYYY-MM-DD' }, headers);
		return;
	}

	const title_en = body.title_en ?? null;
	const content_en = body.content_en ?? null;
	const tags = Array.isArray(body.tags) ? body.tags : [];
	const author = body.author ?? 'michi';

	try {
		const result = await getSql()`
			INSERT INTO journal_entries (date, title_es, title_en, content_es, content_en, tags, author)
			VALUES (${date}, ${title_es}, ${title_en}, ${content_es}, ${content_en}, ${tags}::text[], ${author})
			RETURNING id, date, title_es, title_en, content_es, content_en, tags, author
		`;
		sendJson(res, 201, { entry: result[0] }, headers);
	} catch (err) {
		if (err instanceof Error && 'code' in err && err.code === '23505') {
			sendJson(res, 409, { error: 'Entry already exists for this date and title (idempotent)' }, headers);
			return;
		}

		const message = err instanceof Error ? err.message : 'Insert failed';
		console.error('[POST /api/journal]', message);
		sendJson(res, 500, { error: 'Internal server error', details: message }, headers);
	}
}

const server = createServer(async (req, res) => {
	const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
	const headers = corsHeaders(req.headers.origin);

	if (req.method === 'OPTIONS') {
		res.writeHead(204, headers);
		res.end();
		return;
	}

	if (url.pathname === '/health') {
		sendJson(res, 200, { ok: true }, headers);
		return;
	}

	if (url.pathname !== '/api/journal') {
		sendJson(res, 404, { error: 'Not found' }, headers);
		return;
	}

	if (req.method === 'GET') {
		await handleGet(res, headers);
		return;
	}

	if (req.method === 'POST') {
		await handlePost(req, res, headers);
		return;
	}

	sendJson(res, 405, { error: 'Method not allowed' }, { ...headers, Allow: 'GET, POST, OPTIONS' });
});

server.listen(PORT, '0.0.0.0', () => {
	console.log(`[journal-api] listening on 0.0.0.0:${PORT}`);
});
