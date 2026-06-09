<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SiteLayout from '$lib/layout/SiteLayout.svelte';
	import favicon from '$lib/assets/favicon.png';
	import { ensureLoaded } from '$lib/journal-store.svelte';
	import '../styles/app.scss';

	let { children } = $props();

	let isDemoRoute = $derived($page.url.pathname.startsWith('/demos'));

	let background: 'grid' | 'dots' | 'cyber' | undefined = $derived.by(() => {
		if (isDemoRoute) return 'dots';
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

{#if isDemoRoute}
	{@render children()}
{:else}
	<SiteLayout {background}>
		{@render children()}
	</SiteLayout>
{/if}
