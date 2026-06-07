<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: string;
		children?: Snippet;
	}

	let { tag = 'div', children }: Props = $props();
</script>

<svelte:element this={tag} class="container">
	{@render children?.()}
</svelte:element>
