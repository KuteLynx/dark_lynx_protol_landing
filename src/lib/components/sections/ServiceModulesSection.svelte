<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import IconBox from '$lib/components/ui/IconBox.svelte';
	import TagList from '$lib/components/ui/TagList.svelte';
	import { tObj } from '$lib/i18n';
</script>

<div class="service-modules-section">
	<div class="grid-2">
		{#each tObj<any[]>('services.modules') as module}
			<Card glow class="service-module-card">
				<div class="service-module-card__header">
					<IconBox name={module.icon} />
					<h3 class="service-module-card__title mono text-accent">{module.title}</h3>
				</div>
				<p class="service-module-card__desc">{module.description}</p>
				<div class="service-module-card__tags">
					<TagList tags={module.tags} />
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
