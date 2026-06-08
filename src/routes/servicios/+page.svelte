<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import ServiceModulesSection from '$lib/components/sections/ServiceModulesSection.svelte';
	import TechStackSection from '$lib/components/sections/TechStackSection.svelte';
	import CtaPanel from '$lib/components/sections/CtaPanel.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t } from '$lib/i18n';
</script>

<SeoHead title={t('seo.services.title')} description={t('seo.services.desc')} path="/servicios" />

<Section size="md">
	<PageHero 
		overline={t('services.hero.overline')}
		title={t('services.hero.title')}
		description={t('services.hero.description')}
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
