<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SiteLayout from '$lib/layout/SiteLayout.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { ensureLoaded } from '$lib/journal-store.svelte';
	import '../styles/app.scss';

	let { children } = $props();

	let background: 'grid' | 'dots' | 'cyber' | undefined = $derived.by(() => {
		const path = $page.url.pathname;
		if (path === '/servicios') return 'grid';
		if (path === '/sobre-mi' || path === '/diario') return 'cyber';
		return 'dots';
	});

	// Warm-on-boot: fire journal fetch on app mount, non-blocking
	onMount(() => {
		ensureLoaded();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteLayout {background}>
	{@render children()}
</SiteLayout>
