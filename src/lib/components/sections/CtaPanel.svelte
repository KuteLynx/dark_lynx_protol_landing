<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n';
</script>

<div class="cta-panel">
	<Card glow class="cta-card">
		<div class="cta-card__content">
			<h2 class="cta-card__title">{t('services.cta.title')}</h2>
			<p class="cta-card__desc">
				{t('services.cta.description')}
			</p>
		</div>
		<div class="cta-card__actions">
			<Button variant="primary" size="lg" href="/contacto">
				{t('cta.startProtocol')}
			</Button>
		</div>
	</Card>
</div>

<style lang="scss">
	.cta-card {
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

		&__content {
			display: flex;
			flex-direction: column;
			gap: var(--space-3);
			max-width: 650px;
		}

		&__title {
			font-size: var(--font-size-section-title);
			margin: 0;
			letter-spacing: -0.01em;
		}

		&__desc {
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			margin: 0;
			line-height: 1.6;
		}

		&__actions {
			flex-shrink: 0;
		}
	}
</style>
