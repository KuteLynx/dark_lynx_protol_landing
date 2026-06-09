<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import IconBox from '$lib/components/ui/IconBox.svelte';
	import DemoNav from '$lib/components/demos/DemoNav.svelte';
	import DemoHero from '$lib/components/demos/DemoHero.svelte';
	import DemoSection from '$lib/components/demos/DemoSection.svelte';
	import DemoCTA from '$lib/components/demos/DemoCTA.svelte';
	import DemoFooter from '$lib/components/demos/DemoFooter.svelte';
	import RestaurantMenuCard from '$lib/components/demos/RestaurantMenuCard.svelte';
	import { restauranteData } from '$lib/data/demoRestaurante';

	const data = restauranteData;
</script>

<SeoHead
	title="Brasa Norte — Demo de landing para restaurante"
	description="Demo navegable de landing page para restaurante local. Menú, experiencia, galería y ubicación. Mockup creado por Dark Lynx Protocol."
	path="/demos/restaurante"
	noindex={true}
/>

<!-- Demo Nav -->
<DemoNav brand={data.name} items={data.nav} />

<!-- Shell -->
<main class="demo-shell demo-shell--restaurante">
	<!-- Hero -->
	<DemoHero
		id="inicio"
		overline="Cocina al fuego"
		title={data.tagline}
		description={data.description}
		backgroundGradient="radial-gradient(ellipse at center bottom, #3a2d22 0%, #1a1410 70%)"
	/>

	<!-- Menú -->
	<DemoSection id="menu" title="Menú destacado" overline="Nuestra carta">
		<div class="grid-2">
			{#each data.menu as item}
				<RestaurantMenuCard { ... item} />
			{/each}
		</div>
	</DemoSection>

	<!-- Experiencia -->
	<DemoSection id="experiencia" title="La experiencia" overline="Más que cenar">
		<div class="grid-3">
			{#each data.experiences as exp}
				<Card interactive>
					<div class="demo-experience-card">
						<IconBox name={exp.icon} />
						<h3 class="demo-experience-card__title">{exp.title}</h3>
						<p class="demo-experience-card__description">{exp.description}</p>
					</div>
				</Card>
			{/each}
		</div>
	</DemoSection>

	<!-- Galería -->
	<DemoSection id="galeria" title="Galería" overline="Ambiente">
		<div class="demo-gallery-grid">
			{#each data.gallery as img}
				<div class="demo-gallery-item" role="img" aria-label={img.alt}></div>
			{/each}
		</div>
	</DemoSection>

	<!-- Ubicación -->
	<DemoSection id="ubicacion" title="Horarios y ubicación" overline="Encuéntranos">
		<div class="grid-2">
			<div class="demo-location-info">
				<p class="demo-location__address">{data.location.address}</p>
				{#each data.location.hours as h}
					<div class="demo-location__hours">
						<span class="demo-location__day">{h.day}</span>
						<span class="demo-location__time">{h.time}</span>
					</div>
				{/each}
				<p class="demo-location__phone">{data.location.phone}</p>
			</div>
			<div class="demo-map-placeholder">
				<span>Mapa — Ubicación ficticia</span>
			</div>
		</div>
	</DemoSection>

	<!-- CTA final -->
	<DemoSection id="reservar">
		<DemoCTA
			title={data.cta.title}
			description={data.cta.description}
			buttonLabel={data.cta.buttonLabel}
			buttonHref={data.cta.buttonHref}
		/>
	</DemoSection>
</main>

<!-- Footer -->
<DemoFooter brandName={data.name} />

<style lang="scss">
	.demo-experience-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-sm) 0;

		&__title {
			font-size: var(--font-size-lg);
			font-weight: 600;
			margin: 0;
		}

		&__description {
			font-size: var(--font-size-sm);
			color: var(--color-text-muted);
			margin: 0;
			line-height: 1.5;
		}
	}
</style>
