<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import HomeHero from '$lib/components/sections/HomeHero.svelte';
	import ProblemSection from '$lib/components/sections/ProblemSection.svelte';
	import ServicesPreviewSection from '$lib/components/sections/ServicesPreviewSection.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>Dark Lynx Protocol — {t('seo.home.title')}</title>
	<meta name="description" content={t('seo.home.desc')} />
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
