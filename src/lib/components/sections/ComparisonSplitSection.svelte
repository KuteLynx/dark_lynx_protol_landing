<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { comparisonData } from '$lib/data/philosophy';
	import { AlertTriangle, ShieldCheck } from '@lucide/svelte';
</script>

<div class="comparison-split">
	<SectionHeader 
		overline="DIFERENCIACIÓN"
		title="Agencia Tradicional vs Estudio Boutique"
		description="Compara los dos enfoques de desarrollo y decide qué tipo de código y relación profesional prefieres para tu negocio."
		align="center"
	/>

	<div class="grid-2">
		<Card class="comp-card comp-card--red">
			<div class="comp-card__header text-danger">
				<AlertTriangle size={24} />
				<h3 class="comp-card__title mono">{comparisonData.traditional.title}</h3>
			</div>
			<ul class="comp-card__list">
				{#each comparisonData.traditional.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</Card>

		<Card class="comp-card comp-card--green">
			<div class="comp-card__header text-accent">
				<ShieldCheck size={24} />
				<h3 class="comp-card__title mono">{comparisonData.boutique.title}</h3>
			</div>
			<ul class="comp-card__list">
				{#each comparisonData.boutique.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</Card>
	</div>
</div>

<style lang="scss">
	:global(.comp-card) {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		height: 100%;

		&.comp-card--red {
			border-color: rgba(255, 180, 171, 0.2);
			&:hover {
				border-color: var(--color-danger);
			}
		}

		&.comp-card--green {
			border-color: rgba(0, 255, 65, 0.2);
			&:hover {
				border-color: var(--color-accent);
			}
		}
	}

	.comp-card {
		&__header {
			display: flex;
			align-items: center;
			gap: var(--space-3);
		}

		&__title {
			font-size: var(--font-size-card-title);
			margin: 0;
		}

		&__list {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: var(--space-4);

			li {
				position: relative;
				padding-left: var(--space-6);
				font-size: var(--font-size-small);
				color: var(--color-text-muted);
				line-height: 1.5;

				&::before {
					content: '•';
					position: absolute;
					left: var(--space-2);
					top: 0;
				}
			}
		}

		&--red &__list li::before {
			color: var(--color-danger);
		}

		&--green &__list li::before {
			color: var(--color-accent);
		}
	}
</style>
