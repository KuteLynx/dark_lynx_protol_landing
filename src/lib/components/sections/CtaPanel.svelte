<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { ctaConfig } from '$lib/data/navigation';
</script>

<div class="cta-panel">
	<Card glow class="cta-card">
		<div class="cta-card__content">
			<h2 class="cta-card__title">¿Listo para elevar tus estándares web?</h2>
			<p class="cta-card__desc">
				Agenda una llamada diagnóstica sin compromisos. Evaluamos la velocidad de tu web actual, identificamos problemas de código y te proponemos un protocolo técnico claro.
			</p>
		</div>
		<div class="cta-card__actions">
			<Button variant="primary" size="lg" href={ctaConfig.href}>
				{ctaConfig.label}
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
		gap: var(--space-6);
		padding: var(--space-8) var(--space-6) !important;
		background: radial-gradient(circle at top right, rgba(0, 255, 65, 0.05), transparent), rgba(19, 19, 19, 0.75);

		@media (min-width: 768px) {
			flex-direction: row;
			text-align: left;
			justify-content: space-between;
			padding: var(--space-10) var(--space-12) !important;
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
