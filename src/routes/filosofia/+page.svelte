<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import PrinciplesBentoSection from '$lib/components/sections/PrinciplesBentoSection.svelte';
	import ComparisonSplitSection from '$lib/components/sections/ComparisonSplitSection.svelte';
	import QuoteBlock from '$lib/components/ui/QuoteBlock.svelte';
	import { manifestoQuote } from '$lib/data/philosophy';
</script>

<svelte:head>
	<title>Filosofía y Manifiesto — Dark Lynx Protocol</title>
	<meta name="description" content="Nuestra filosofía de ingeniería: desarrollo directo, rendimiento prioritario, código limpio y mantenible." />
</svelte:head>

<Section size="md">
	<PageHero 
		overline="FILOSOFÍA"
		title="El Manifiesto de Dark Lynx"
		description="Creemos en el software honesto, construido sobre bases firmes, libre de dependencias infladas y diseñado para durar."
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
		<QuoteBlock text={manifestoQuote.text} author={manifestoQuote.author} />
	</div>
</Section>

<style lang="scss">
	.manifesto-quote-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>
