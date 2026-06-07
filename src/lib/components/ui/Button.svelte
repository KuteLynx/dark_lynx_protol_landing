<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
	}

	let {
		variant = 'primary',
		size = 'md',
		href = undefined,
		type = 'button',
		disabled = false,
		children,
		onclick
	}: Props = $props();
</script>

{#if href}
	<a
		{href}
		class="btn btn--{variant} btn--{size}"
		class:btn--disabled={disabled}
		role="button"
		{onclick}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{type}
		class="btn btn--{variant} btn--{size}"
		{disabled}
		{onclick}
	>
		{@render children?.()}
	</button>
{/if}

<style lang="scss">
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-weight: 700;
		text-align: center;
		text-decoration: none;
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
		cursor: pointer;
		border: 1px solid transparent;
		gap: var(--space-2);
		white-space: nowrap;

		// Sizes
		&--sm {
			font-size: var(--font-size-xs);
			padding: var(--space-2) var(--space-4);
		}

		&--md {
			font-size: var(--font-size-small);
			padding: var(--space-3) var(--space-6);
		}

		&--lg {
			font-size: var(--font-size-body);
			padding: var(--space-4) var(--space-8);
			letter-spacing: 0.05em;
		}

		// Variants
		&--primary {
			background-color: var(--color-accent);
			color: var(--color-bg-deep);
			border-color: var(--color-accent);

			&:hover:not(:disabled) {
				background-color: var(--color-accent-soft);
				box-shadow: var(--shadow-glow-strong);
				transform: translateY(-1px);
			}

			&:active:not(:disabled) {
				transform: translateY(0);
			}
		}

		&--outline {
			background-color: transparent;
			color: var(--color-accent);
			border-color: var(--color-accent);

			&:hover:not(:disabled) {
				background-color: rgba(0, 255, 65, 0.05);
				box-shadow: var(--shadow-glow);
				transform: translateY(-1px);
			}

			&:active:not(:disabled) {
				transform: translateY(0);
			}
		}

		&--ghost {
			background-color: transparent;
			color: var(--color-text-muted);

			&:hover:not(:disabled) {
				color: var(--color-accent);
				background-color: var(--color-surface-low);
			}
		}

		&--disabled,
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}
	}
</style>
