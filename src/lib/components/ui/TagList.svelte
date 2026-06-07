<script lang="ts">
	import Tag from './Tag.svelte';

	interface Props {
		tags: string[];
	}

	let { tags }: Props = $props();
</script>

<div class="tag-list">
	{#each tags as tag}
		<Tag label={tag} />
	{/each}
</div>

<style lang="scss">
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}
</style>
