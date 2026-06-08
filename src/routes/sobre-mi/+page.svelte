<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import ProfileHero from '$lib/components/sections/ProfileHero.svelte';
	import BioBentoSection from '$lib/components/sections/BioBentoSection.svelte';
	import SystemStatusPanel from '$lib/components/sections/SystemStatusPanel.svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{t('nav.about')} — Dark Lynx Protocol</title>
	<meta name="description" content={t('seo.about.desc')} />
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
