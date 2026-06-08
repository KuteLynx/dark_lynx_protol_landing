<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import ProfileHero from '$lib/components/sections/ProfileHero.svelte';
	import BioBentoSection from '$lib/components/sections/BioBentoSection.svelte';
	import SystemStatusPanel from '$lib/components/sections/SystemStatusPanel.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t } from '$lib/i18n';
</script>

<SeoHead title={t('seo.about.title')} description={t('seo.about.desc')} path="/sobre-mi" />

<Section size="lg">
	<ProfileHero />
</Section>

<Section size="md" id="trayectoria">
	<BioBentoSection />
</Section>

<Section size="md" id="status">
	<SystemStatusPanel />
</Section>
