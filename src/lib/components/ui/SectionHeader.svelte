<script lang="ts">
	interface Props {
		overline?: string;
		title: string;
		description?: string;
		align?: 'left' | 'center';
	}

	let { overline = '', title, description = '', align = 'left' }: Props = $props();
</script>

<div class="section-header section-header--{align}">
	{#if overline}
		<span class="section-header__overline mono text-accent">&gt;_ {overline}</span>
	{/if}
	<h2 class="section-header__title">{title}</h2>
	{#if description}
		<p class="section-header__desc">{description}</p>
	{/if}
</div>

<style lang="scss">
	.section-header {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space-10);
		max-width: 700px;

		&--center {
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			align-items: center;
		}

		&--left {
			text-align: left;
			align-items: flex-start;
		}

		&__overline {
			font-size: var(--font-size-xs);
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin-bottom: var(--space-2);
		}

		&__title {
			margin-bottom: var(--space-4);
		}

		&__desc {
			font-size: var(--font-size-body);
			line-height: 1.6;
		}
	}
</style>
