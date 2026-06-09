<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	let {
		name = '',
		description = '',
		price = '',
		tag = null as string | null
	} = $props();
</script>

<Card interactive>
	<div class="demo-menu-card">
		<div class="demo-menu-card__header">
			<span class="demo-menu-card__name">{name}</span>
			<span class="demo-menu-card__price">{price}</span>
		</div>
		<p class="demo-menu-card__description">{description}</p>
		{#if tag}
			<span class="demo-menu-card__tag">{tag}</span>
		{/if}
	</div>
</Card>
