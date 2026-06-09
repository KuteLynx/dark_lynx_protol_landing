<script lang="ts">
	interface Props {
		overline?: string;
		title: string;
		description?: string;
		align?: 'left' | 'center';
	}

	let { overline = '', title, description = '', align = 'center' }: Props = $props();
</script>

<div class="page-hero page-hero--{align} fx-hero-enter">
	{#if overline}
		<span class="page-hero__overline mono text-accent">&gt;_ {overline}</span>
	{/if}
	<h1 class="page-hero__title">{title}</h1>
	{#if description}
		<p class="page-hero__desc">{description}</p>
	{/if}
</div>

<style lang="scss">
	.page-hero {
		display: flex;
		flex-direction: column;
		max-width: 900px;
		margin: var(--space-8) auto var(--space-4);

		&--center {
			text-align: center;
			align-items: center;
			margin-left: auto;
			margin-right: auto;
		}

		&--left {
			text-align: left;
			align-items: flex-start;
		}

		&__overline {
			font-size: var(--font-size-xs);
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin-bottom: var(--space-3);
		}

		&__title {
			font-size: var(--font-size-page-title);
			margin-bottom: var(--space-4);
			letter-spacing: -0.02em;
		}

		&__desc {
			font-size: clamp(1rem, 2.5vw, 1.125rem);
			color: var(--color-text-muted);
			line-height: 1.6;
			max-width: 700px;
		}
	}
</style>
