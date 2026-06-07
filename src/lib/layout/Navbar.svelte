<script lang="ts">
	import { page } from '$app/stores';
	import { navigationItems, ctaConfig } from '$lib/data/navigation';
	import { Menu, X } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}
</script>

<header class="navbar fx-glass">
	<div class="container navbar__container">
		<a href="/" class="navbar__brand mono" onclick={closeMenu}>
			<span class="text-accent">&lt;</span>DARK_LYNX_PROTOCOL<span class="text-accent">/&gt;</span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="navbar__nav navbar__nav--desktop">
			<ul class="navbar__links">
				{#each navigationItems as item}
					<li>
						<a 
							href={item.href} 
							class="navbar__link mono { $page.url.pathname === item.href ? 'navbar__link--active' : '' }"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			<a href={ctaConfig.href} class="btn-cta btn-cta--sm mono">{ctaConfig.label}</a>
		</nav>

		<!-- Mobile Hamburger -->
		<button class="navbar__toggle" onclick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
			{#if isOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>

	<!-- Mobile Dropdown Navigation -->
	{#if isOpen}
		<nav class="navbar__nav navbar__nav--mobile fx-glass" transition:fade={{ duration: 150 }}>
			<ul class="navbar__links">
				{#each navigationItems as item}
					<li>
						<a 
							href={item.href} 
							class="navbar__link mono { $page.url.pathname === item.href ? 'navbar__link--active' : '' }"
							onclick={closeMenu}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			<a href={ctaConfig.href} class="btn-cta btn-cta--mobile mono" onclick={closeMenu}>
				{ctaConfig.label}
			</a>
		</nav>
	{/if}
</header>

<style lang="scss">
	@use 'src/styles/abstracts/mixins' as *;

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: var(--z-sticky);
		border-bottom: 1px solid var(--color-border-soft);

		&__container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 70px;
		}

		&__brand {
			font-size: var(--font-size-small);
			font-weight: 700;
			letter-spacing: 0.05em;
			color: var(--color-text);
			text-decoration: none;

			span {
				font-weight: 900;
			}
		}

		&__toggle {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--color-text);
			transition: color var(--transition-fast);
			width: 40px;
			height: 40px;

			&:hover {
				color: var(--color-accent);
			}

			@include respond-to('md') {
				display: none;
			}
		}

		&__nav {
			&--desktop {
				display: none;
				align-items: center;
				gap: var(--space-8);

				@include respond-to('md') {
					display: flex;
				}
			}

			&--mobile {
				position: absolute;
				top: 70px;
				left: 0;
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: var(--space-8) var(--space-page-mobile);
				border-bottom: 1px solid var(--color-border-soft);
				gap: var(--space-6);

				@include respond-to('md') {
					display: none;
				}
			}
		}

		&__links {
			display: flex;
			flex-direction: column;
			gap: var(--space-4);
			padding: 0;
			margin: 0;
			list-style: none;

			@include respond-to('md') {
				flex-direction: row;
				align-items: center;
				gap: var(--space-6);
			}
		}

		&__link {
			font-size: var(--font-size-small);
			color: var(--color-text-muted);
			padding: var(--space-1) 0;
			border-bottom: 2px solid transparent;
			display: inline-block;

			&:hover {
				color: var(--color-accent);
			}

			&--active {
				color: var(--color-accent);
				border-bottom: 2px solid var(--color-accent);
			}
		}
	}

	.btn-cta {
		display: inline-block;
		font-size: var(--font-size-xs);
		font-weight: 700;
		color: var(--color-bg-deep);
		background-color: var(--color-accent);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-sm);
		text-align: center;
		transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
		border: 1px solid var(--color-accent);
		text-decoration: none;

		&:hover {
			background-color: var(--color-accent-soft);
			box-shadow: var(--shadow-glow);
		}

		&--mobile {
			width: 100%;
		}
	}
</style>
