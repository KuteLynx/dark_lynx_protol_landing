<script lang="ts">
	import { Palette } from '@lucide/svelte';
	import { theme, THEMES } from '$lib/themes';
	import { fly } from 'svelte/transition';

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}

	function selectTheme(id: string) {
		theme.id = id;
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent, id: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			selectTheme(id);
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (isOpen && !target.closest('.theme-selector')) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="theme-selector">
	<button class="theme-selector__btn mono" onclick={toggle} aria-label="Cambiar tema / Change theme" aria-expanded={isOpen}>
		<Palette size={14} class="theme-selector__icon text-accent" />
		<span class="theme-selector__label">{theme.current.name}</span>
	</button>

	{#if isOpen}
		<div class="theme-selector__menu fx-glass" transition:fly={{ y: -5, duration: 150 }}>
			{#each Object.values(THEMES) as t}
				<div
					role="button"
					tabindex="0"
					class="theme-selector__option mono {theme.id === t.id ? 'active' : ''}"
					onclick={() => selectTheme(t.id)}
					onkeydown={(e) => handleKeydown(e, t.id)}
				>
					<span class="theme-selector__option-name">{t.name}</span>
					<div class="theme-selector__preview">
						<div class="theme-selector__color" style="background: {t.colors.accent}"></div>
						<div class="theme-selector__color" style="background: {t.colors.bg}"></div>
						<div class="theme-selector__color" style="background: {t.colors.surface}"></div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.theme-selector {
		position: relative;
		display: inline-block;

		&__btn {
			display: flex;
			align-items: center;
			gap: var(--space-2);
			background: transparent;
			border: 1px solid var(--color-border-soft);
			border-radius: var(--radius-sm);
			padding: var(--space-1) var(--space-2);
			color: var(--color-text-muted);
			font-size: var(--font-size-xs);
			cursor: pointer;
			transition: all var(--transition-fast);

			&:hover, &[aria-expanded="true"] {
				border-color: var(--color-accent);
				box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.1);
			}
		}

		&__label {
			white-space: nowrap;
		}

		&__menu {
			position: absolute;
			top: calc(100% + var(--space-2));
			right: 0;
			min-width: 200px;
			border-radius: var(--radius-md);
			padding: var(--space-2);
			display: flex;
			flex-direction: column;
			gap: var(--space-1);
			z-index: var(--z-dropdown);
		}

		&__option {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: var(--space-2);
			border-radius: var(--radius-sm);
			cursor: pointer;
			transition: background var(--transition-fast), color var(--transition-fast);
			color: var(--color-text-muted);
			font-size: var(--font-size-xs);

			&:hover, &:focus-visible {
				background: var(--color-surface);
				color: var(--color-accent);
				outline: none;
			}

			&.active {
				color: var(--color-bg-deep);
				background: var(--color-accent);
				font-weight: 700;

				.theme-selector__color {
					border-color: var(--color-bg-deep);
				}
			}
		}

		&__preview {
			display: flex;
			gap: 2px;
		}

		&__color {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			border: 1px solid var(--color-border-soft);
		}
	}
</style>
