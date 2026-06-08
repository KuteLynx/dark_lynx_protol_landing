<script lang="ts">
	import profileImg from '$lib/assets/profile-hacker.png';
	import { t } from '$lib/i18n';
	import { goto } from '$app/navigation';
	import { grantJournalAccess } from '$lib/data/journal-access.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let hoverTimer: ReturnType<typeof setTimeout> | null = null;
	let isRevealed = $state(false);

	function handleMouseEnter() {
		if (!isRevealed) {
			hoverTimer = setTimeout(() => {
				isRevealed = true;
			}, 2000);
		}
	}

	function handleMouseLeave() {
		if (hoverTimer) {
			clearTimeout(hoverTimer);
			hoverTimer = null;
		}
		isRevealed = false;
	}

	function handleSecretClick() {
		grantJournalAccess();
		goto('/diario');
	}
</script>

<div class="profile-hero">
	<div class="profile-hero__content">
		<div class="profile-hero__badge badge text-accent mono">ROOT_ACCESS_GRANTED</div>
		<h1 class="profile-hero__name font-glow">Gerardo Martínez</h1>
		<div class="profile-hero__role text-danger mono">{t('about.profile.role')}</div>
		<p class="profile-hero__bio">
			{t('about.profile.bio')}
		</p>
	</div>
	<div class="terminal-frame">
		<div class="terminal-frame__header">
			<div class="terminal-frame__dot"></div>
			<div class="terminal-frame__dot"></div>
			<div class="terminal-frame__dot"></div>
			<div class="terminal-frame__title">admin@darklynx: ~</div>
		</div>
		<div class="terminal-frame__body" onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave} role="region" aria-label="Terminal Image">
			<img src={profileImg} alt="Admin Avatar" class="terminal-frame__image" class:faded={isRevealed} />
			<div class="secret-button-wrapper" class:visible={isRevealed}>
				<Button variant="primary" onclick={handleSecretClick}>{t('about.profile.secretButton')}</Button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'src/styles/abstracts/mixins' as *;

	.profile-hero {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		align-items: center;

		@include respond-to('lg') {
			grid-template-columns: 7fr 5fr;
			gap: var(--space-12);
		}

		&__content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		&__badge {
			margin-bottom: var(--space-4);
		}

		&__name {
			font-size: var(--font-size-page-title);
			margin-bottom: var(--space-2);
		}

		&__role {
			font-size: var(--font-size-card-title);
			margin-bottom: var(--space-6);
			font-weight: 600;
		}

		&__bio {
			font-size: var(--font-size-body);
			color: var(--color-text-muted);
			line-height: 1.7;
			margin: 0;
		}
	}

	.terminal-frame {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-bg-deep);
		overflow: hidden;
		box-shadow: var(--shadow-lg), var(--shadow-glow);

		&__header {
			background-color: var(--color-surface-low);
			padding: var(--space-2) var(--space-4);
			display: flex;
			align-items: center;
			gap: var(--space-2);
			border-bottom: 1px solid var(--color-border-soft);
		}

		&__dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background-color: var(--color-surface-highest);

			&:nth-child(1) { background-color: #ff5f56; }
			&:nth-child(2) { background-color: #ffbd2e; }
			&:nth-child(3) { background-color: #27c93f; }
		}

		&__title {
			font-size: var(--font-size-xs);
			color: var(--color-text-subtle);
			margin-left: auto;
			margin-right: auto;
		}

		&__body {
			padding: var(--space-4);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}

		&__image {
			width: 100%;
			max-width: 320px;
			height: auto;
			border-radius: var(--radius-sm);
			border: 1px solid var(--color-border-soft);
			filter: grayscale(20%) contrast(110%);
			transition: opacity 1s ease-in-out;
			z-index: 2;

			&.faded {
				opacity: 0;
				pointer-events: none;
			}
		}
	}

	.secret-button-wrapper {
		position: absolute;
		z-index: 1;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease-in-out;
		
		&.visible {
			opacity: 1;
			pointer-events: auto;
			z-index: 3;
		}
	}
</style>
