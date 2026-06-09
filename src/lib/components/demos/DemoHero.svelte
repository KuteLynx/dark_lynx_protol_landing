<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id = '',
		overline = '',
		title = '',
		description = '',
		backgroundGradient = '',
		children
	}: {
		id?: string;
		overline?: string;
		title: string;
		description?: string;
		backgroundGradient?: string;
		children?: Snippet;
	} = $props();
</script>

<section class="demo-hero" {id} style={backgroundGradient ? `background: ${backgroundGradient};` : ''}>
	{#if overline}
		<p class="demo-hero__overline">{overline}</p>
	{/if}

	<h1 class="demo-hero__title">{title}</h1>

	{#if description}
		<p class="demo-hero__description">{description}</p>
	{/if}

	{#if children}
		<div class="demo-hero__actions">
			{@render children()}
		</div>
	{/if}
</section>
