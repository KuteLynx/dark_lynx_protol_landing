<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import IconBox from '$lib/components/ui/IconBox.svelte';
	import { servicePreviews } from '$lib/data/services';
</script>

<div class="services-preview-section">
	<SectionHeader 
		overline="QUÉ HACEMOS"
		title="Servicios prácticos sin sobrecarga"
		description="Diseñamos protocolos técnicos específicos para cada problema. Sin envoltorios comerciales innecesarios, directo al grano."
	/>

	<div class="grid-3">
		{#each servicePreviews as service}
			<Card interactive class="service-preview-card">
				<div class="service-preview-card__icon">
					<IconBox name={service.icon} />
				</div>
				<h3 class="service-preview-card__title mono">{service.title}</h3>
				<p class="service-preview-card__desc">{service.description}</p>
			</Card>
		{/each}
	</div>

	<div class="services-preview-section__actions">
		<Button variant="outline" href="/servicios">
			Ver todos los servicios y stack técnico
		</Button>
	</div>
</div>

<style lang="scss">
	.services-preview-section {
		&__actions {
			margin-top: var(--space-10);
			display: flex;
			justify-content: center;
		}
	}

	:global(.service-preview-card) {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: var(--space-4);
	}

	.service-preview-card {
		&__icon {
			margin-bottom: var(--space-2);
		}

		&__title {
			font-size: var(--font-size-card-title);
			margin: 0;
		}

		&__desc {
			font-size: var(--font-size-small);
			line-height: 1.6;
			margin: 0;
		}
	}
</style>
