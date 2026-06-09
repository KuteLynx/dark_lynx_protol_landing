<script lang="ts">
	let { title = '', description = '', buttonLabel = '', buttonHref = '' } = $props();
</script>

<div class="demo-cta">
	<h2 class="demo-cta__title">{title}</h2>
	{#if description}
		<p class="demo-cta__description">{description}</p>
	{/if}
	<a href={buttonHref} class="btn btn--primary">{buttonLabel}</a>
</div>
