<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import IconBox from '$lib/components/ui/IconBox.svelte';
	import { techStack } from '$lib/data/tech-stack';
</script>

<div class="tech-stack-section">
	<SectionHeader 
		overline="EL ARSENAL"
		title="Stack tecnológico moderno y optimizado"
		description="Seleccionamos herramientas que favorecen la velocidad, la escalabilidad y la facilidad de mantenimiento."
		align="center"
	/>

	<div class="tech-stack-grid">
		{#each techStack as tech}
			<Card class="tech-card">
				<IconBox name={tech.icon} size={20} />
				<span class="tech-card__name mono">{tech.name}</span>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'src/styles/abstracts/mixins' as *;

	.tech-stack-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);

		@include respond-to('md') {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	:global(.tech-card) {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: var(--space-4) !important;
		gap: var(--space-3);
		border-color: var(--color-border-soft);
		height: 100%;
		justify-content: center;
	}

	.tech-card {
		&__name {
			font-size: var(--font-size-xs);
			color: var(--color-text-muted);
			font-weight: 600;
		}
	}
</style>
