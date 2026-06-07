<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { profileInfo } from '$lib/data/profile';
</script>

<div class="bio-bento">
	<h2 class="bio-bento__heading mono text-accent">&gt;_ HISTORIAL_DE_TRAYECTORIA</h2>
	<div class="bento-grid">
		{#each profileInfo.trajectory as job, idx}
			{@const spanClass = idx === 0 ? 'col-span-4' : idx === 1 ? 'col-span-2' : 'col-span-6'}
			<Card interactive class="job-card {spanClass}">
				<div class="job-card__meta">
					<span class="job-card__year mono text-accent">{job.year}</span>
					<span class="job-card__company mono">// {job.company}</span>
				</div>
				<h3 class="job-card__title">{job.title}</h3>
				<p class="job-card__desc">{job.description}</p>
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
