<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { AlertTriangle, ShieldCheck } from '@lucide/svelte';
	import { X, Check } from '@lucide/svelte';
	import { t, tObj } from '$lib/i18n';
	
	let data = $derived(tObj<any>('philosophy.comparison'));
</script>

<div class="comparison-section">
	<SectionHeader 
		overline={t('philosophy.comparison.overline') || 'DIFERENCIACIÓN'}
		title={t('philosophy.comparison.headerTitle') || 'Agencia Tradicional vs Estudio Boutique'}
		description={t('philosophy.comparison.description') || 'Compara los dos enfoques de desarrollo y decide qué tipo de código y relación profesional prefieres para tu negocio.'}
		align="center"
	/>

	<div class="grid-2">
		<!-- Traditional Approach (Bad) -->
		<Card class="comparison-card comparison-card--bad">
			<h3 class="comparison-card__title mono text-danger">{data.traditional.title}</h3>
			<ul class="comparison-list comparison-list--bad">
				{#each data.traditional.items as item}
					<li>
						<span class="comparison-list__icon"><X size={16} /></span>
						{item}
					</li>
				{/each}
			</ul>
		</Card>

		<!-- Boutique Approach (Good) -->
		<Card glow class="comparison-card comparison-card--good">
			<h3 class="comparison-card__title mono text-accent">{data.boutique.title}</h3>
			<ul class="comparison-list comparison-list--good">
				{#each data.boutique.items as item}
					<li>
						<span class="comparison-list__icon"><Check size={16} /></span>
						{item}
					</li>
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
