<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import HomeHero from '$lib/components/sections/HomeHero.svelte';
	import CommercialPathsSection from '$lib/components/sections/CommercialPathsSection.svelte';
	import ProblemSection from '$lib/components/sections/ProblemSection.svelte';
	import ServicesPreviewSection from '$lib/components/sections/ServicesPreviewSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t } from '$lib/i18n';
</script>

<SeoHead title={t('seo.home.title')} description={t('seo.home.desc')} />

<Section size="lg">
	<HomeHero />
</Section>

<Section size="sm" id="rutas">
	<CommercialPathsSection />
</Section>

<Section size="md" id="problema">
	<ProblemSection />
</Section>

<Section size="md" id="servicios">
	<ServicesPreviewSection />
</Section>
