<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import IconBox from '$lib/components/ui/IconBox.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<div class="landing-offer-section">
	<SectionHeader
		overline={t('landingPages.included.overline')}
		title={t('landingPages.included.title')}
	/>

	<div class="grid-2">
		{#each tObj<any[]>('landingPages.included.items') as item}
			<Card interactive class="landing-offer-card">
				<IconBox name={item.icon} />
				<div>
					<h3 class="landing-offer-card__title mono">{item.title}</h3>
					<p class="landing-offer-card__desc">{item.description}</p>
				</div>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	:global(.landing-offer-card) {
		display: flex;
		gap: var(--space-4);
		height: 100%;
	}

	:global(.landing-offer-card__title) {
		font-size: var(--font-size-card-title);
		margin: 0 0 var(--space-2);
	}

	:global(.landing-offer-card__desc) {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
