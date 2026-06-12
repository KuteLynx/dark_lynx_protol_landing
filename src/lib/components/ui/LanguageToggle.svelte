<script lang="ts">
	import { locale } from '$lib/i18n';
	import { Globe } from '@lucide/svelte';

	function toggleLocale() {
		locale.current = locale.current === 'es' ? 'en' : 'es';
	}
</script>

<button class="lang-toggle mono" onclick={toggleLocale} aria-label="Cambiar idioma / Change language">
	<Globe size={14} class="lang-toggle__icon text-accent" />
	<span class="lang-toggle__text">
		<span class:active={locale.current === 'es'}>ES</span>
		<span class="lang-toggle__separator">/</span>
		<span class:active={locale.current === 'en'}>EN</span>
	</span>
</button>

<style lang="scss">
	.lang-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		background: transparent;
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-sm);
		padding: var(--space-1) var(--space-2);
		color: var(--color-text-muted);
		font-size: var(--font-size-xs);
		cursor: pointer;
		transition: all var(--transition-fast);

		&:hover {
			border-color: var(--color-accent);
			box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.1);
		}

		&__text {
			display: flex;
			align-items: center;
			gap: 2px;
		}

		&__separator {
			color: var(--color-border);
		}

		.active {
			color: var(--color-accent);
			font-weight: 700;
		}
	}
</style>
