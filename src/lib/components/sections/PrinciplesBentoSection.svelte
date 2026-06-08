<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { tObj } from '$lib/i18n';
</script>

<div class="principles-bento">
	<div class="bento-grid">
		{#each tObj<any[]>('philosophy.principles') as principle}
			<Card interactive class="principle-card {principle.span}">
				<span class="principle-card__number mono text-accent fx-text-glow">{principle.number}</span>
				<div class="principle-card__content">
					<h3 class="principle-card__title mono">{principle.title}</h3>
					<p class="principle-card__desc">{principle.description}</p>
				</div>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	:global(.principle-card) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		min-height: 220px;
		gap: var(--space-6);
	}

	.principle-card {
		&__number {
			font-size: clamp(3rem, 10vw, 4.5rem);
			font-weight: 900;
			line-height: 1;
			opacity: 0.15;
			position: absolute;
			top: var(--space-4);
			right: var(--space-6);
			pointer-events: none;
			user-select: none;
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: var(--space-3);
			margin-top: auto;
			z-index: var(--z-base);
		}

		&__title {
			font-size: var(--font-size-card-title);
			margin: 0;
			letter-spacing: -0.01em;
		}

		&__desc {
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			line-height: 1.6;
			margin: 0;
		}
	}
</style>
