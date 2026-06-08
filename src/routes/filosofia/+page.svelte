<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import PrinciplesBentoSection from '$lib/components/sections/PrinciplesBentoSection.svelte';
	import ComparisonSplitSection from '$lib/components/sections/ComparisonSplitSection.svelte';
	import QuoteBlock from '$lib/components/ui/QuoteBlock.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<SeoHead title={t('seo.philosophy.title')} description={t('seo.philosophy.desc')} path="/filosofia" />

<Section size="md">
	<PageHero 
		overline={t('philosophy.hero.overline')}
		title={t('philosophy.hero.title')}
		description={t('philosophy.hero.description')}
	/>
</Section>

<Section size="sm" id="principios">
	<PrinciplesBentoSection />
</Section>

<Section size="md" id="comparativa">
	<ComparisonSplitSection />
</Section>

<Section size="md" id="manifiesto">
	<div class="manifesto-quote-wrapper">
		<QuoteBlock text={t('philosophy.quote.text')} author={t('philosophy.quote.author')} />
	</div>
</Section>

<style lang="scss">
	.manifesto-quote-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>
