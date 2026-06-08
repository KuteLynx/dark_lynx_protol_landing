import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

/**
 * Neon serverless SQL client (HTTP driver).
 * Uses the connection pooler endpoint for optimal serverless performance.
 *
 * The client is created lazily on first use — cold starts will be slower,
 * but subsequent calls reuse the module-level singleton.
 */

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
	if (!_sql) {
		const connectionString = env.DATABASE_URL;
		if (!connectionString) {
			throw new Error('DATABASE_URL environment variable is not set');
		}
		_sql = neon(connectionString);
	}
	return _sql;
}

/**
 * Tagged template SQL function. Use as:
 *   const rows = await sql`SELECT * FROM journal_entries`;
 */
export async function sql<T = unknown>(
	strings: TemplateStringsArray,
	...values: unknown[]
): Promise<T[]> {
	return getSql()(strings, ...values) as Promise<T[]>;
}
