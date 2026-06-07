<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import TerminalText from '$lib/components/ui/TerminalText.svelte';
	import LinkCard from '$lib/components/ui/LinkCard.svelte';
	import { profileInfo } from '$lib/data/profile';
	import { socialLinks } from '$lib/data/social-links';
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
				<TerminalText prefix=">_ STATUS:" text={profileInfo.systemStatus.status} />
				<TerminalText prefix=">_ ACCEPTING_NEW_PROJECTS:" text={profileInfo.systemStatus.acceptingProjects} />
				<TerminalText prefix=">_ INTEGRITY_CHECK:" text={profileInfo.systemStatus.uptime} blink />
				
				<div class="focus-list-wrapper">
					<h4 class="focus-list-title mono text-accent">// ENFOQUE_ACTUAL:</h4>
					<ul class="focus-list">
						{#each profileInfo.currentFocus as focus}
							<li>{focus}</li>
						{/each}
					</ul>
				</div>
			</div>
		</Card>

		<!-- Social Link Connections -->
		<div class="status-panel__links flow">
			<h4 class="links-title mono">&gt;_ INICIAR_CONEXION</h4>
			{#each socialLinks as link}
				<LinkCard 
					href={link.href}
					title={link.name}
					description="Abrir canal seguro en {link.name}"
					iconName={link.icon}
				/>
			{/each}
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

	.links-title {
		font-size: var(--font-size-small);
		color: var(--color-text);
		margin-bottom: var(--space-4);
		margin-top: 0;
	}
</style>
