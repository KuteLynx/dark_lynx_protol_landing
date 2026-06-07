<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import IconBox from '$lib/components/ui/IconBox.svelte';
	import TagList from '$lib/components/ui/TagList.svelte';
	import { serviceModules } from '$lib/data/services';
</script>

<div class="service-modules-section">
	<div class="grid-2x2">
		{#each serviceModules as mod}
			<Card interactive glow class="module-card">
				<div class="module-card__header">
					<IconBox name={mod.icon} />
					<h3 class="module-card__title mono">{mod.title}</h3>
				</div>
				<p class="module-card__desc">{mod.description}</p>
				<div class="module-card__tags">
					<TagList tags={mod.tags} />
				</div>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	:global(.module-card) {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: var(--space-4);
	}

	.module-card {
		&__header {
			display: flex;
			align-items: center;
			gap: var(--space-4);
		}

		&__title {
			font-size: var(--font-size-card-title);
			margin: 0;
		}

		&__desc {
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			line-height: 1.6;
			margin: 0;
			flex-grow: 1;
		}

		&__tags {
			margin-top: var(--space-2);
		}
	}
</style>
