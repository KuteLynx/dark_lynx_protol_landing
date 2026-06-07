<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
	import PageBackground from './PageBackground.svelte';

	interface Props {
		background?: 'dots' | 'grid' | 'cyber';
		children?: Snippet;
	}

	let { background = 'dots', children }: Props = $props();
</script>

<div class="site-layout">
	<PageBackground variant={background} />
	<Navbar />
	<main class="site-layout__content">
		{@render children?.()}
	</main>
	<Footer />
</div>

<style lang="scss">
	.site-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		&__content {
			flex: 1;
			padding-top: 70px;
		}
	}
</style>
