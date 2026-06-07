<script lang="ts">
	import { page } from '$app/stores';
	import SiteLayout from '$lib/layout/SiteLayout.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/app.scss';

	let { children } = $props();

	let background = $derived.by(() => {
		const path = $page.url.pathname;
		if (path === '/servicios') return 'grid';
		if (path === '/sobre-mi') return 'cyber';
		return 'dots';
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteLayout {background}>
	{@render children()}
</SiteLayout>
