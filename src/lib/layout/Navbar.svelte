<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import LanguageToggle from '$lib/components/ui/LanguageToggle.svelte';
	import ThemeSelector from '$lib/components/ui/ThemeSelector.svelte';
	import { t } from '$lib/i18n';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	let navItems = $derived([
		{ label: t('nav.home'), href: '/' },
		{ label: t('nav.services'), href: '/servicios' },
		{ label: t('nav.philosophy'), href: '/filosofia' },
		{ label: t('nav.about'), href: '/sobre-mi' },
		{ label: t('nav.contact'), href: '/contacto' }
	]);
</script>

<header class="navbar fx-glass">
	<div class="container navbar__container">
		<a href="/" class="navbar__brand mono" onclick={closeMenu}>
			<span class="text-accent">&lt;</span>DARK_LYNX_PROTOCOL<span class="text-accent">/&gt;</span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="navbar__nav navbar__nav--desktop">
			<ul class="navbar__links">
				{#each navItems as item}
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
			<div class="navbar__actions">
				<ThemeSelector />
				<LanguageToggle />
				<a href="/contacto" class="btn-cta btn-cta--sm mono">{t('cta.requestQuote')}</a>
			</div>
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
		<nav class="navbar__nav navbar__nav--mobile fx-glass" transition:fly={{ y: -20, duration: 300, easing: cubicOut }}>
			<div in:fly={{ y: 20, duration: 300, delay: 50, easing: cubicOut }} class="navbar__mobile-actions">
				<ThemeSelector />
				<LanguageToggle />
			</div>
			<ul class="navbar__links">
				{#each navItems as item, i}
					<li in:fly={{ y: 20, duration: 300, delay: 100 + (i * 50), easing: cubicOut }}>
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
			<div in:fly={{ y: 20, duration: 300, delay: 100 + (navItems.length * 50), easing: cubicOut }} class="navbar__cta-mobile-wrapper">
				<a href="/contacto" class="btn-cta btn-cta--mobile mono" onclick={closeMenu}>
					{t('cta.requestQuote')}
				</a>
			</div>
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

		&__actions {
			display: flex;
			align-items: center;
			gap: var(--space-4);
		}

		&__mobile-actions {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: var(--space-4);
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

	.navbar__cta-mobile-wrapper {
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border-soft);
	}
</style>
