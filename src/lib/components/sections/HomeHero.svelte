<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { ctaConfig } from '$lib/data/navigation';
</script>

<div class="home-hero fx-fade-in">
	<div class="home-hero__badge">
		<Badge dot prefix="STATUS:">AVAILABLE_FOR_BUILD</Badge>
	</div>
	<h1 class="home-hero__title">
		Construimos software <span class="text-accent text-glow">mantenible</span>, directo y técnicamente <span class="text-accent text-glow">sólido</span>.
	</h1>
	<p class="home-hero__desc">
		Dark Lynx Protocol es un estudio boutique de ingeniería web. Creamos landing pages de alto rendimiento, optimizamos Core Web Vitals al extremo y eliminamos la deuda técnica de raíz. Sin rodeos comerciales.
	</p>
	<div class="home-hero__actions">
		<Button variant="primary" size="lg" href={ctaConfig.href}>
			Cuéntame tu proyecto
		</Button>
		<Button variant="outline" size="lg" href="/filosofia">
			Ver Filosofía
		</Button>
	</div>
</div>

<style lang="scss">
	.home-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--space-16) 0 var(--space-12);
		max-width: 900px;
		margin: 0 auto;

		&__badge {
			margin-bottom: var(--space-6);
		}

		&__title {
			margin-bottom: var(--space-6);
			letter-spacing: -0.03em;
		}

		&__desc {
			font-size: clamp(1rem, 3vw, 1.25rem);
			color: var(--color-text-muted);
			margin-bottom: var(--space-8);
			max-width: 750px;
			line-height: 1.6;
		}

		&__actions {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: var(--space-4);

			@media (min-width: 640px) {
				flex-direction: row;
				width: auto;
				justify-content: center;
			}
		}
	}
</style>
