<script lang="ts">
	import Card from './Card.svelte';
	import * as Icons from '@lucide/svelte';
	import SocialIcon from './SocialIcon.svelte';

	interface Props {
		href: string;
		title: string;
		description?: string;
		iconName: string;
		internal?: boolean;
		onclick?: (e: MouseEvent) => void;
	}

	let { href, title, description = '', iconName, internal = false, onclick }: Props = $props();

	function getIconComponent(name: string) {
		return (Icons as any)[name] || Icons.ExternalLink;
	}

	let isSocialIcon = $derived(['github', 'linkedin', 'twitter'].includes(iconName.toLowerCase()));
	let Icon = $derived(!isSocialIcon ? getIconComponent(iconName) : null);
</script>

<a {href} target={internal ? undefined : "_blank"} rel={internal ? undefined : "noopener noreferrer"} class="link-card-anchor" {onclick}>
	<Card interactive glow class="link-card">
		<div class="link-card__content">
			<div class="link-card__icon text-accent">
				{#if isSocialIcon}
					<SocialIcon name={iconName} size={24} />
				{:else}
					<Icon size={24} />
				{/if}
			</div>
			<div class="link-card__text">
				<h3 class="link-card__title mono">{title}</h3>
				{#if description}
					<p class="link-card__desc">{description}</p>
				{/if}
			</div>
		</div>
		<span class="link-card__arrow text-accent mono">-&gt;</span>
	</Card>
</a>

<style lang="scss">
	.link-card-anchor {
		text-decoration: none;
		color: inherit;
		display: block;
		width: 100%;
	}

	:global(.link-card) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6) !important;
	}

	.link-card {
		&__content {
			display: flex;
			align-items: center;
			gap: var(--space-4);
		}

		&__icon {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			height: 44px;
			background-color: var(--color-bg-deep);
			border: 1px solid var(--color-border-soft);
			border-radius: var(--radius-sm);
		}

		&__text {
			display: flex;
			flex-direction: column;
		}

		&__title {
			font-size: var(--font-size-small);
			margin: 0;
		}

		&__desc {
			font-size: var(--font-size-xs);
			color: var(--color-text-subtle);
			margin: 0;
		}

		&__arrow {
			font-size: var(--font-size-body);
			font-weight: 700;
			transition: transform var(--transition-fast);
		}
	}

	.link-card-anchor:hover {
		.link-card__arrow {
			transform: translateX(4px);
		}
	}
</style>
