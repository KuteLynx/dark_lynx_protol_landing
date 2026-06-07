<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import ServiceModulesSection from '$lib/components/sections/ServiceModulesSection.svelte';
	import TechStackSection from '$lib/components/sections/TechStackSection.svelte';
	import CtaPanel from '$lib/components/sections/CtaPanel.svelte';
</script>

<svelte:head>
	<title>Servicios y Módulos de Ejecución — Dark Lynx Protocol</title>
	<meta name="description" content="Nuestros servicios de desarrollo frontend: desarrollo web premium, integraciones, auditoría y refactorización técnica con tecnologías modernas." />
</svelte:head>

<Section size="md">
	<PageHero 
		overline="SERVICIOS"
		title="Módulos de Ejecución Técnica"
		description="Soluciones concretas y estructuradas diseñadas para corregir deficiencias de rendimiento, experiencia de usuario y arquitectura."
	/>
</Section>

<Section size="sm" id="modulos">
	<ServiceModulesSection />
</Section>

<Section size="md" id="arsenal">
	<TechStackSection />
</Section>

<Section size="md">
	<CtaPanel />
</Section>
