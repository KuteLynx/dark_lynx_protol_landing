<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { t, tObj } from '$lib/i18n';
</script>

<div class="bio-bento">
	<SectionHeader 
		overline={t('about.trajectory.overline')}
		title={t('about.trajectory.title')}
		description={t('about.trajectory.description')}
	/>

	<div class="timeline">
		{#each tObj<any[]>('about.trajectory.timeline') as item}
			<Card interactive glow class="timeline-card">
				<div class="timeline-card__year mono text-accent">{item.year}</div>
				<h3 class="timeline-card__title">{item.title} <span class="text-muted">@ {item.company}</span></h3>
				<p class="timeline-card__desc">{item.description}</p>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	.bio-bento {
		&__heading {
			font-size: var(--font-size-small);
			letter-spacing: 0.1em;
			margin-bottom: var(--space-6);
		}
	}

	:global(.job-card) {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		height: 100%;
	}

	.job-card {
		&__meta {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: var(--font-size-xs);
			border-bottom: 1px solid var(--color-border-soft);
			padding-bottom: var(--space-2);
		}

		&__company {
			color: var(--color-text-subtle);
		}

		&__title {
			font-size: var(--font-size-card-title);
			margin: var(--space-1) 0 0 0;
		}

		&__desc {
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			line-height: 1.6;
			margin: 0;
		}
	}
</style>
