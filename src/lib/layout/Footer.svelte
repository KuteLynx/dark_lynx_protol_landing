<script lang="ts">
	import { socialLinks } from '$lib/data/social-links';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';
	import { t } from '$lib/i18n';
</script>

<footer class="footer">
	<div class="container footer__container">
		<div class="footer__brand mono">
			{t('footer.brand')} <span class="text-accent">//</span> {t('footer.status')}
		</div>
		
		<div class="footer__right">
			<ul class="footer__socials">
				{#each socialLinks as link}
					<li>
						<a href={link.href} target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label={link.name}>
							<SocialIcon name={link.icon} size={18} />
						</a>
					</li>
				{/each}
			</ul>
			<div class="footer__copy mono">
				&copy; {new Date().getFullYear()} ADMIN_01
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	.footer {
		border-top: 1px solid var(--color-border-soft);
		background-color: var(--color-bg-deep);
		padding: var(--space-8) 0;

		&__container {
			display: flex;
			flex-direction: column;
			gap: var(--space-4);
			align-items: center;
			justify-content: space-between;

			@media (min-width: 768px) {
				flex-direction: row;
			}
		}

		&__brand {
			font-size: var(--font-size-xs);
			color: var(--color-text-subtle);
			letter-spacing: 0.05em;
		}

		&__right {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-3);

			@media (min-width: 768px) {
				align-items: flex-end;
			}
		}

		&__socials {
			display: flex;
			gap: var(--space-4);
			padding: 0;
			margin: 0;
			list-style: none;
		}

		&__social-link {
			color: var(--color-text-muted);
			transition: color var(--transition-fast);

			&:hover {
				color: var(--color-accent);
			}
		}

		&__copy {
			font-size: var(--font-size-xs);
			color: var(--color-text-subtle);
		}
	}
</style>
