<script lang="ts">
	import { page } from '$app/stores';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import DemoHero from '$lib/components/demos/DemoHero.svelte';
	import DemoSection from '$lib/components/demos/DemoSection.svelte';
	import DemoCTA from '$lib/components/demos/DemoCTA.svelte';
	import DemoFooter from '$lib/components/demos/DemoFooter.svelte';
	import { demoLandingPages } from '$lib/data/demoLandingPages';

	const activeDemos = $derived(demoLandingPages.filter((d) => d.status === 'active'));
	const comingDemos = $derived(demoLandingPages.filter((d) => d.status === 'coming-soon'));
</script>

<SeoHead
	title="Landing pages demo — Dark Lynx Protocol"
	description="Mockups navegables de landing pages para restaurante, peluquería, veterinaria y ecommerce. Ejemplos reales de diseño web profesional."
	path="/demos"
	noindex={true}
/>

<DemoHero
	title="Mockups de landing pages para negocios reales"
	description="Ejemplos navegables de lo que Dark Lynx Protocol puede hacer por tu negocio. Cada demo es visualmente distinta, mobile first y completamente mockup."
/>

<DemoSection title="Explora las demos" size="lg">
	<div class="grid-2" style="margin-top: var(--space-lg);">
		{#each activeDemos as demo}
			<a
				href={demo.href}
				class="demo-card demo-card--active"
				style="
					--card-bg: {demo.palette.bg};
					--card-surface: {demo.palette.surface};
					--card-accent: {demo.palette.accent};
					--card-text: {demo.palette.text};
				"
			>
				<span class="demo-card__status demo-card__status--active">Disponible</span>
				<h3 class="demo-card__name">{demo.name}</h3>
				<p class="demo-card__tagline">{demo.tagline}</p>
				<p class="demo-card__description">{demo.description}</p>
				<span class="demo-card__cta">Ver demo →</span>
			</a>
		{/each}

		{#each comingDemos as demo}
			<div
				class="demo-card demo-card--coming"
				style="
					--card-bg: {demo.palette.bg};
					--card-surface: {demo.palette.surface};
					--card-accent: {demo.palette.accent};
					--card-text: {demo.palette.text};
				"
			>
				<span class="demo-card__status demo-card__status--coming">Próximamente</span>
				<h3 class="demo-card__name">{demo.name}</h3>
				<p class="demo-card__tagline">{demo.tagline}</p>
				<p class="demo-card__description">{demo.description}</p>
			</div>
		{/each}
	</div>
</DemoSection>

<DemoSection>
	<DemoCTA
		title="No necesitas una plataforma gigante para verte profesional."
		description="Una landing clara, rápida y bien diseñada puede ser todo lo que tu negocio necesita para empezar."
		buttonLabel="Quiero una idea para mi negocio"
		buttonHref="/contacto"
	/>
</DemoSection>

<DemoFooter brandName="Dark Lynx Protocol" />

<style lang="scss">
	.demo-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-xl);
		border-radius: var(--radius-lg);
		background: var(--card-surface, var(--color-surface));
		border: 1px solid var(--color-border);
		text-decoration: none;
		transition: transform 0.2s, border-color 0.2s;

		&--active {
			cursor: pointer;

			&:hover {
				transform: translateY(-4px);
				border-color: var(--card-accent, var(--color-accent));
			}
		}

		&--coming {
			opacity: 0.55;
			cursor: default;
		}

		&__status {
			align-self: flex-start;
			font-size: 11px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			padding: 2px 8px;
			border-radius: var(--radius-full);

			&--active {
				background: var(--card-accent, var(--color-accent));
				color: var(--card-bg, var(--color-bg));
			}

			&--coming {
				background: var(--color-surface-hover);
				color: var(--color-text-muted);
			}
		}

		&__name {
			font-size: var(--font-size-xl);
			font-weight: 700;
			color: var(--card-text, var(--color-text));
			margin: 0;
		}

		&__tagline {
			font-size: var(--font-size-sm);
			color: var(--card-accent, var(--color-accent));
			margin: 0;
		}

		&__description {
			font-size: var(--font-size-sm);
			color: var(--color-text-muted);
			margin: 0;
			line-height: 1.5;
		}

		&__cta {
			margin-top: auto;
			font-size: var(--font-size-sm);
			font-weight: 600;
			color: var(--card-accent, var(--color-accent));
		}
	}
</style>
