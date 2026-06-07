<script lang="ts">
	interface Props {
		prefix?: string;
		text: string;
		blink?: boolean;
	}

	let { prefix = '', text, blink = false }: Props = $props();
</script>

<div class="terminal-text mono">
	{#if prefix}
		<span class="terminal-text__prefix text-accent">{prefix}</span>
	{/if}
	<span class="terminal-text__content">{text}</span>{#if blink}<span class="fx-cursor-blink"></span>{/if}
</div>

<style lang="scss">
	.terminal-text {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		line-height: 1.5;

		&__prefix {
			margin-right: var(--space-2);
			font-weight: 700;
		}
	}
</style>
