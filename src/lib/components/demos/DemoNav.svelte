<script lang="ts">
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	let { brand = 'Demo', items = [] as { label: string; href: string }[] } = $props();

	let isOpen = $state(false);
	let prevPath = $state($page.url.pathname);

	$effect(() => {
		if ($page.url.pathname !== prevPath) {
			isOpen = false;
			prevPath = $page.url.pathname;
		}
	});
</script>

<nav class="demo-nav">
	<a href="#inicio" class="demo-nav__brand">{brand}</a>

	<button
		class="demo-nav__hamburger"
		onclick={() => (isOpen = !isOpen)}
		aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
		aria-expanded={isOpen}
	>
		{#if isOpen}
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		{:else}
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		{/if}
	</button>

	<ul class="demo-nav__links" class:is-open={isOpen}>
		{#each items as item}
			<li>
				<a href={item.href} class="demo-nav__link" onbeforetoggle={() => (isOpen = false)}>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
