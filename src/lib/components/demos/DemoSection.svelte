<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id = '',
		title = '',
		overline = '',
		description = '',
		size = 'md' as 'sm' | 'md' | 'lg',
		children
	}: {
		id?: string;
		title?: string;
		overline?: string;
		description?: string;
		size?: 'sm' | 'md' | 'lg';
		children?: Snippet;
	} = $props();
</script>

<section
	class="demo-section demo-section--{size}"
	class:demo-section--sm={size === 'sm'}
	class:demo-section--lg={size === 'lg'}
	{id}
>
	<div class="demo-section__inner">
		{#if title || overline}
			<div class="demo-section__header">
				{#if overline}
					<p class="demo-section__overline">{overline}</p>
				{/if}
				{#if title}
					<h2 class="demo-section__title">{title}</h2>
				{/if}
				{#if description}
					<p class="demo-section__description">{description}</p>
				{/if}
			</div>
		{/if}

		{@render children?.()}
	</div>
</section>
