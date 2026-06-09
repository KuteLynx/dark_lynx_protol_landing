<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<div class="faq-section">
	<SectionHeader
		overline={t('landingPages.faq.overline')}
		title={t('landingPages.faq.title')}
		align="center"
	/>

	<div class="faq-section__list">
		{#each tObj<any[]>('landingPages.faq.items') as item}
			<Card class="faq-card">
				<h3 class="faq-card__question">{item.question}</h3>
				<p class="faq-card__answer">{item.answer}</p>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	.faq-section__list {
		display: grid;
		gap: var(--space-4);
		max-width: 900px;
		margin: 0 auto;
	}

	:global(.faq-card) {
		padding: var(--space-5) var(--space-6);
	}

	:global(.faq-card__question) {
		font-size: var(--font-size-card-title);
		margin: 0 0 var(--space-2);
	}

	:global(.faq-card__answer) {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
