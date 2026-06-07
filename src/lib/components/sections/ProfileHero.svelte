<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import { profileInfo } from '$lib/data/profile';
</script>

<div class="profile-hero">
	<div class="profile-hero__content">
		<div class="profile-hero__badge">
			<Badge prefix="ID:">{profileInfo.id}</Badge>
		</div>
		<h1 class="profile-hero__name">{profileInfo.name}</h1>
		<h2 class="profile-hero__role mono text-accent">{profileInfo.role}</h2>
		<p class="profile-hero__bio">{profileInfo.bio}</p>
	</div>

	<div class="profile-hero__frame">
		<div class="terminal-frame">
			<div class="terminal-frame__header">
				<span class="terminal-frame__dot"></span>
				<span class="terminal-frame__dot"></span>
				<span class="terminal-frame__dot"></span>
				<span class="terminal-frame__title mono">ADMIN_AVATAR.PNG</span>
			</div>
			<div class="terminal-frame__body">
				<img src="/profile_avatar.png" alt="Admin Avatar" class="terminal-frame__image" />
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
		}

		&__image {
			width: 100%;
			max-width: 320px;
			height: auto;
			border-radius: var(--radius-sm);
			border: 1px solid var(--color-border-soft);
			filter: grayscale(20%) contrast(110%);
		}
	}
</style>
