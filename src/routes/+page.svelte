<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import HomeHero from '$lib/components/sections/HomeHero.svelte';
	import ProblemSection from '$lib/components/sections/ProblemSection.svelte';
	import ServicesPreviewSection from '$lib/components/sections/ServicesPreviewSection.svelte';
</script>

<svelte:head>
	<title>Dark Lynx Protocol — Ingeniería y Desarrollo Frontend Premium</title>
	<meta name="description" content="Estudio boutique de desarrollo frontend. Construimos landing pages rápidas, optimizadas para Core Web Vitals, con SCSS limpio y componentes Svelte mantenibles." />
</svelte:head>

<Section size="lg">
	<HomeHero />
</Section>

<Section size="md" id="problema">
	<ProblemSection />
</Section>

<Section size="md" id="servicios">
	<ServicesPreviewSection />
</Section>
