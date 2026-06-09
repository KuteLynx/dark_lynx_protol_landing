<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<div class="process-section">
	<SectionHeader
		overline={t('landingPages.process.overline')}
		title={t('landingPages.process.title')}
	/>

	<div class="process-section__grid">
		{#each tObj<any[]>('landingPages.process.steps') as step}
			<Card class="process-card">
				<span class="process-card__number mono">{step.number}</span>
				<h3 class="process-card__title">{step.title}</h3>
				<p class="process-card__desc">{step.description}</p>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	.process-section__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);

		@media (min-width: 768px) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	:global(.process-card) {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		height: 100%;
	}

	:global(.process-card__number) {
		color: var(--color-accent);
		font-size: var(--font-size-small);
		font-weight: 700;
	}

	:global(.process-card__title) {
		font-size: var(--font-size-card-title);
		margin: 0;
	}

	:global(.process-card__desc) {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
