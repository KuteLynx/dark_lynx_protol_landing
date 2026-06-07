<script lang="ts">
	interface Props {
		text: string;
		author?: string;
	}

	let { text, author = '' }: Props = $props();
</script>

<blockquote class="quote-block fx-glass">
	<p class="quote-block__text mono">
		<span class="text-accent">"</span>{text}<span class="text-accent">"</span>
	</p>
	{#if author}
		<cite class="quote-block__author mono text-accent">
			// {author}
		</cite>
	{/if}
</blockquote>

<style lang="scss">
	.quote-block {
		border-left: 4px solid var(--color-accent);
		padding: var(--space-6) var(--space-8);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
		margin: var(--space-8) 0;
		max-width: 800px;

		&__text {
			font-size: var(--font-size-body);
			color: var(--color-text);
			margin-bottom: var(--space-4);
			line-height: 1.6;
		}

		&__author {
			display: block;
			font-size: var(--font-size-xs);
			font-style: normal;
			font-weight: 700;
			letter-spacing: 0.05em;
		}
	}
</style>
