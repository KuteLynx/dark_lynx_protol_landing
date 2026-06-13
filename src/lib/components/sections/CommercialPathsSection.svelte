<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { tObj } from '$lib/i18n';
</script>

<div class="commercial-paths-section">
	<div class="grid-3">
		{#each tObj<any[]>('home.commercialPaths') as path}
			<a class="commercial-path-link" href={path.link}>
				<Card interactive class="commercial-path-card">
					<h2 class="commercial-path-card__title mono">{path.title}</h2>
					<p class="commercial-path-card__desc">{path.description}</p>
				</Card>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.commercial-path-link {
		text-decoration: none;
		color: inherit;
		display: block;
		height: 100%;
	}

	:global(.commercial-path-card) {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	:global(.commercial-path-card__title) {
		font-size: var(--font-size-card-title);
		color: var(--color-accent);
		margin: 0;
	}

	:global(.commercial-path-card__desc) {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
