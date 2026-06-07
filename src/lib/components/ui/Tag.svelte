<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<span class="tag mono">{label}</span>

<style lang="scss">
	.tag {
		display: inline-block;
		font-size: var(--font-size-xs);
		color: var(--color-text-subtle);
		background-color: var(--color-bg-deep);
		border: 1px solid var(--color-border-soft);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		white-space: nowrap;
	}
</style>
