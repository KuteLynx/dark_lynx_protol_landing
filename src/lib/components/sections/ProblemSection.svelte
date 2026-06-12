<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<div class="problem-section">
	<SectionHeader 
		overline={t('home.problem.overline')}
		title={t('home.problem.title')}
		description={t('home.problem.description')}
	/>

	<div class="grid-2">
		<Card class="problem-card problem-card--red">
			<h3 class="problem-card__title mono text-danger">{t('home.problem.alert')}</h3>
			<ul class="problem-card__list">
				{#each tObj<string[]>('home.problem.alertList') as item}
					<li>{item}</li>
				{/each}
			</ul>
		</Card>

		<Card class="problem-card problem-card--green">
			<h3 class="problem-card__title mono text-accent">{t('home.problem.protocol')}</h3>
			<ul class="problem-card__list">
				{#each tObj<string[]>('home.problem.protocolList') as item}
					<li>{item}</li>
				{/each}
			</ul>
		</Card>
	</div>
</div>

<style lang="scss">
	:global(.problem-card) {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	:global(.problem-card.problem-card--red) {
		border-color: rgba(255, 180, 171, 0.2);
		border-color: rgba(var(--danger-rgb), 0.2);
		&:hover {
			border-color: var(--color-danger);
		}
	}

	:global(.problem-card.problem-card--green) {
		border-color: rgba(var(--accent-rgb), 0.2);
		&:hover {
			border-color: var(--color-accent);
		}
	}

	:global(.problem-card__title) {
		font-size: var(--font-size-small);
		letter-spacing: 0.05em;
	}

	:global(.problem-card__list) {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);

		li {
			position: relative;
			padding-left: var(--space-4);
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			line-height: 1.5;

			&::before {
				content: '•';
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}

	:global(.problem-card--red .problem-card__list li::before) {
		color: var(--color-danger);
	}

	:global(.problem-card--green .problem-card__list li::before) {
		color: var(--color-accent);
	}
</style>
