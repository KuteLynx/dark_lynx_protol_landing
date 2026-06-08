<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import TypewriterText from '$lib/components/ui/TypewriterText.svelte';
	import LinkCard from '$lib/components/ui/LinkCard.svelte';
	import { socialLinks } from '$lib/data/social-links';
	import { t, tObj } from '$lib/i18n';
	import { grantJournalAccess } from '$lib/data/journal-access.svelte';

	function handleLinkClick(e: MouseEvent, link: any) {
		if (link.internal) {
			e.preventDefault();
			grantJournalAccess();
			goto(link.href);
		}
	}
</script>

<div class="status-panel">
	<div class="grid-2">
		<!-- Terminal Status Info -->
		<Card class="terminal-panel-card">
			<div class="terminal-panel-card__header mono">
				<span>SYSTEM_STATUS.SH</span>
				<span class="text-accent">[STABLE]</span>
			</div>
			<div class="terminal-panel-card__body flow">
				<TypewriterText prefix=">_ STATUS:" text={t('about.status.stable')} delay={0} />
				<TypewriterText prefix=">_ ACCEPTING_NEW_PROJECTS:" text={t('about.status.accepting')} delay={500} />
				<TypewriterText prefix=">_ INTEGRITY_CHECK:" text={t('about.status.integrity')} blink delay={1000} />
				
				<div class="focus-list-wrapper">
					<h4 class="focus-list-title mono text-accent">{t('about.status.focusTitle')}</h4>
					<ul class="focus-list">
						{#each tObj<string[]>('about.status.focus') as focusItem}
							<li>{focusItem}</li>
						{/each}
					</ul>
				</div>
			</div>
		</Card>

		<!-- Direct Connect Links -->
		<div class="direct-connect flow">
			<h3 class="direct-connect__title mono text-accent">{t('about.status.connectTitle')}</h3>
			<div class="direct-connect__links">
				{#each socialLinks as link}
					<LinkCard 
						href={link.href} 
						title={link.i18nKey ? t(link.i18nKey) : link.name} 
						description="{t('about.status.linkDesc')} {link.i18nKey ? t(link.i18nKey) : link.name}"
						iconName={link.icon} 
						internal={link.internal}
						onclick={(e) => handleLinkClick(e, link)}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	:global(.terminal-panel-card) {
		border-color: var(--color-border);
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.terminal-panel-card {
		&__header {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid var(--color-border-soft);
			padding-bottom: var(--space-2);
			font-size: var(--font-size-xs);
			color: var(--color-text-subtle);
		}

		&__body {
			--flow-space: var(--space-3);
		}
	}

	.focus-list-wrapper {
		margin-top: var(--space-6);
	}

	.focus-list-title {
		font-size: var(--font-size-xs);
		margin-bottom: var(--space-2);
	}

	.focus-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);

		li {
			position: relative;
			padding-left: var(--space-4);
			font-size: var(--font-size-xs);
			color: var(--color-text-muted);
			line-height: 1.5;

			&::before {
				content: '↳';
				position: absolute;
				left: 0;
				color: var(--color-accent);
			}
		}
	}

	.direct-connect {
		&__title {
			font-size: var(--font-size-small);
			color: var(--color-text);
			margin-bottom: var(--space-4);
			margin-top: 0;
		}

		&__links {
			display: flex;
			flex-direction: column;
			gap: var(--space-4);
		}
	}
</style>
