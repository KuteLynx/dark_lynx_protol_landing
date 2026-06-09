<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SiteLayout from '$lib/layout/SiteLayout.svelte';
	import TypewriterText from '$lib/components/ui/TypewriterText.svelte';
	import favicon from '$lib/assets/favicon.png';
	import { ensureLoaded } from '$lib/journal-store.svelte';
	import '../styles/app.scss';

	let { children } = $props();
	let showBootLoader = $state(true);

	let background: 'grid' | 'dots' | 'cyber' | undefined = $derived.by(() => {
		const path = $page.url.pathname;
		if (path === '/servicios') return 'grid';
		if (path === '/sobre-mi' || path === '/diario') return 'cyber';
		return 'dots';
	});

	// Warm-on-boot: fire journal fetch on app mount, non-blocking
	onMount(() => {
		ensureLoaded();

		const loaderTimer = setTimeout(() => {
			showBootLoader = false;
		}, 2100);

		return () => clearTimeout(loaderTimer);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteLayout {background}>
	{@render children()}
</SiteLayout>

{#if showBootLoader}
	<div class="boot-loader" aria-label="Dark Lynx Protocol loading screen">
		<div class="boot-loader__panel">
			<div class="boot-loader__eyebrow mono">SECURE_SESSION</div>
			<TypewriterText text="Dark Lynx Protocol login" speed={48} prefix=">_" blink />
			<div class="boot-loader__bar" aria-hidden="true"></div>
		</div>
	</div>
{/if}

<style lang="scss">
	.boot-loader {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: grid;
		place-items: center;
		padding: var(--space-6);
		background:
			radial-gradient(circle at 50% 40%, rgba(0, 255, 65, 0.08), transparent 34rem),
			linear-gradient(180deg, rgba(5, 8, 5, 0.98), rgba(3, 5, 3, 0.99));
		animation: bootExit 2.1s ease forwards;
	}

	.boot-loader__panel {
		width: min(100%, 420px);
		padding: var(--space-6);
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-md);
		background: rgba(19, 19, 19, 0.82);
		box-shadow: var(--shadow-lg), var(--shadow-glow);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.boot-loader__eyebrow {
		margin-bottom: var(--space-3);
		font-size: var(--font-size-xs);
		letter-spacing: 0.12em;
		color: var(--color-text-subtle);
	}

	.boot-loader__bar {
		position: relative;
		height: 2px;
		margin-top: var(--space-5);
		overflow: hidden;
		border-radius: var(--radius-full);
		background: var(--color-border-soft);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
			animation: bootScan 1.1s ease-in-out infinite;
		}
	}

	@keyframes bootScan {
		from { transform: translateX(-100%); }
		to { transform: translateX(100%); }
	}

	@keyframes bootExit {
		0%, 78% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot-loader,
		.boot-loader__bar::before {
			animation: none;
		}
	}
</style>
