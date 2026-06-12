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
	:global(.comparison-card) {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		height: 100%;
		padding: var(--space-8);

		&.comparison-card--bad {
			border-color: rgba(255, 180, 171, 0.2);
			border-color: rgba(var(--danger-rgb), 0.2);
			&:hover {
				border-color: var(--color-danger);
			}
		}

		&.comparison-card--good {
			border-color: rgba(var(--accent-rgb), 0.2);
			&:hover {
				border-color: var(--color-accent);
			}
		}
	}

	:global(.comparison-card__title) {
		font-size: var(--font-size-card-title);
		font-weight: 700;
		margin: 0 0 var(--space-4) 0;
		letter-spacing: -0.01em;
	}

	:global(.comparison-list) {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);

		li {
			display: flex;
			align-items: flex-start;
			gap: var(--space-3);
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			line-height: 1.5;
		}
	}

	:global(.comparison-list__icon) {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		margin-top: 3px;
	}

	:global(.comparison-list--bad) li :global(.comparison-list__icon) {
		color: var(--color-danger);
	}

	:global(.comparison-list--good) li :global(.comparison-list__icon) {
		color: var(--color-accent);
	}
</style>
