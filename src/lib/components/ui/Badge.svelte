<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		dot?: boolean;
		prefix?: string;
		children?: Snippet;
	}

	let { dot = false, prefix = '', children }: Props = $props();
</script>

<div class="badge mono">
	{#if dot}
		<span class="badge__dot"></span>
	{/if}
	{#if prefix}
		<span class="badge__prefix text-accent">{prefix}</span>
	{/if}
	<span class="badge__content">
		{@render children?.()}
	</span>
</div>

<style lang="scss">
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-3);
		background-color: var(--color-bg-deep);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
		width: fit-content;

		&__dot {
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background-color: var(--color-accent);
			box-shadow: 0 0 8px var(--color-accent);
			display: inline-block;
			animation: badge-pulse 2s infinite;
		}

		&__prefix {
			font-weight: 700;
		}
	}

	@keyframes badge-pulse {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.25);
			opacity: 0.4;
		}
	}
</style>
