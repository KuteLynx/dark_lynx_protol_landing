<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		id?: string;
		children?: Snippet;
	}

	let { size = 'md', id = undefined, children }: Props = $props();
</script>

<section class="section section--{size}" {id}>
	<Container>
		{@render children?.()}
	</Container>
</section>
