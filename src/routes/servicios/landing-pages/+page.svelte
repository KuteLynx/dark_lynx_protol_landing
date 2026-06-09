<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import LandingPagesOfferSection from '$lib/components/sections/LandingPagesOfferSection.svelte';
	import PackagesSection from '$lib/components/sections/PackagesSection.svelte';
	import ProcessSection from '$lib/components/sections/ProcessSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import CtaPanel from '$lib/components/sections/CtaPanel.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n';
</script>

<SeoHead title={t('seo.landingPages.title')} description={t('seo.landingPages.description')} path="/servicios/landing-pages" />

<Section size="md">
	<PageHero
		overline={t('landingPages.hero.overline')}
		title={t('landingPages.hero.title')}
		description={t('landingPages.hero.description')}
	/>
	<div class="landing-hero-actions">
		<Button variant="primary" size="lg" href="/contacto">{t('cta.talkBusiness')}</Button>
		<Button variant="outline" size="lg" href="/servicios">{t('cta.viewAllServices')}</Button>
	</div>
</Section>

<Section size="md" id="incluye">
	<LandingPagesOfferSection />
</Section>

<Section size="md" id="paquetes">
	<PackagesSection />
</Section>

<Section size="md" id="proceso">
	<ProcessSection />
</Section>

<Section size="md" id="faq">
	<FaqSection />
</Section>

<Section size="md">
	<CtaPanel
		title={t('landingPages.cta.title')}
		description={t('landingPages.cta.description')}
		buttonLabel={t('landingPages.cta.button')}
	/>
</Section>

<style lang="scss">
	.landing-hero-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		margin-top: var(--space-8);

		@media (min-width: 640px) {
			flex-direction: row;
		}
	}
</style>
