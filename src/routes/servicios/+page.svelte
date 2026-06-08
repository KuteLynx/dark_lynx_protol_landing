<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import ServiceModulesSection from '$lib/components/sections/ServiceModulesSection.svelte';
	import TechStackSection from '$lib/components/sections/TechStackSection.svelte';
	import CtaPanel from '$lib/components/sections/CtaPanel.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{t('nav.services')} — Dark Lynx Protocol</title>
	<meta name="description" content={t('seo.services.desc')} />
</svelte:head>

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
