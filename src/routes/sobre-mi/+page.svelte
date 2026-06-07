<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import ProfileHero from '$lib/components/sections/ProfileHero.svelte';
	import BioBentoSection from '$lib/components/sections/BioBentoSection.svelte';
	import SystemStatusPanel from '$lib/components/sections/SystemStatusPanel.svelte';
</script>

<svelte:head>
	<title>Sobre Mí — Gerardo — Dark Lynx Protocol</title>
	<meta name="description" content="Conoce a Gerardo, arquitecto e ingeniero de software fundador de Dark Lynx Protocol. Especializado en desarrollo frontend y optimizaciones de alta velocidad." />
</svelte:head>

<Section size="lg">
	<ProfileHero />
</Section>

<Section size="md" id="trayectoria">
	<BioBentoSection />
</Section>

<Section size="md" id="status">
	<SystemStatusPanel />
</Section>
