<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n';

	interface Props {
		title?: string;
		description?: string;
		buttonLabel?: string;
		href?: string;
	}

	let {
		title = t('services.cta.title'),
		description = t('services.cta.description'),
		buttonLabel = t('cta.requestQuote'),
		href = '/contacto'
	}: Props = $props();
</script>

<div class="cta-panel">
	<Card glow class="cta-card">
		<div class="cta-card__content">
			<h2 class="cta-card__title">{title}</h2>
			<p class="cta-card__desc">
				{description}
			</p>
		</div>
		<div class="cta-card__actions">
			<Button variant="primary" size="lg" {href}>
				{buttonLabel}
			</Button>
		</div>
	</Card>
</div>

<style lang="scss">
	:global(.cta-card) {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-8);
		padding: var(--space-10) var(--space-6) !important;
		background: radial-gradient(circle at top right, rgba(0, 255, 65, 0.05), transparent), rgba(19, 19, 19, 0.75);

		@media (min-width: 768px) {
			flex-direction: row;
			text-align: left;
			justify-content: space-between;
			padding: var(--space-12) var(--space-16) !important;
		}
	}

	:global(.cta-card__content) {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: 650px;
	}

	:global(.cta-card__title) {
		font-size: var(--font-size-section-title);
		margin: 0;
		letter-spacing: -0.01em;
	}

	:global(.cta-card__desc) {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.6;
	}

	:global(.cta-card__actions) {
		flex-shrink: 0;
	}
</style>
