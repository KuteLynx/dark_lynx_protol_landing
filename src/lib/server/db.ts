import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

/**
 * Neon serverless SQL client (HTTP driver).
 * Uses the connection pooler endpoint for optimal serverless performance.
 *
 * The client is created lazily on first use — cold starts will be slower,
 * but subsequent calls reuse the module-level singleton.
 */

let _sql: ReturnType<typeof neon> | null = null;

function getSql() {
	if (!_sql) {
		const connectionString = env.DATABASE_URL;
		if (!connectionString) {
			throw new Error('DATABASE_URL environment variable is not set');
		}
		_sql = neon(connectionString);
	}
	return _sql;
}

export const sql = new Proxy({} as ReturnType<typeof neon>, {
	get(_target, prop, receiver) {
		return Reflect.get(getSql(), prop, receiver);
	},
	apply(_target, thisArg, args) {
		return Reflect.apply(getSql() as unknown as (...args: unknown[]) => unknown, thisArg, args);
	}
});
