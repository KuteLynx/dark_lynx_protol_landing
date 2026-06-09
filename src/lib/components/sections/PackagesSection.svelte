<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<div class="packages-section">
	<SectionHeader
		overline={t('landingPages.packages.overline')}
		title={t('landingPages.packages.title')}
		align="center"
	/>

	<div class="grid-3">
		{#each tObj<any[]>('landingPages.packages.items') as packageItem}
			<Card interactive class="package-card">
				<p class="package-card__kicker mono">{packageItem.name}</p>
				<h3 class="package-card__price">{packageItem.price}</h3>
				<p class="package-card__desc">{packageItem.description}</p>
				<ul class="package-card__features">
					{#each packageItem.features as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	:global(.package-card) {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: var(--space-4);
	}

	:global(.package-card__kicker) {
		color: var(--color-accent);
		font-size: var(--font-size-xs);
		font-weight: 700;
		letter-spacing: 0.08em;
		margin: 0;
	}

	:global(.package-card__price) {
		font-size: var(--font-size-card-title);
		margin: 0;
	}

	:global(.package-card__desc) {
		color: var(--color-text-muted);
		font-size: var(--font-size-small);
		line-height: 1.6;
		margin: 0;
	}

	:global(.package-card__features) {
		list-style: none;
		padding: 0;
		margin: auto 0 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		font-size: var(--font-size-small);
	}

	:global(.package-card__features li::before) {
		content: '✓';
		color: var(--color-accent);
		margin-right: var(--space-2);
	}
</style>
