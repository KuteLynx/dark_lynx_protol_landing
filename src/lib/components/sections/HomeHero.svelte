<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { locale, t } from '$lib/i18n';
</script>

<div class="home-hero fx-hero-enter">
	<div class="home-hero__badge">
		<Badge dot prefix="STATUS:">{t('home.hero.badge')}</Badge>
	</div>
	{#key locale.current}
		<h1 class="home-hero__title">
			{@html t('home.hero.title')}
		</h1>
	{/key}
	<p class="home-hero__desc">
		{t('home.hero.description')}
	</p>
	<div class="home-hero__actions">
		<Button variant="primary" size="lg" href="/contacto">
			{t('home.hero.ctaPrimary')}
		</Button>
		<Button variant="outline" size="lg" href="/servicios">
			{t('home.hero.ctaSecondary')}
		</Button>
	</div>
</div>

<style lang="scss">
	.home-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--space-16) 0 var(--space-12);
		max-width: 900px;
		margin: 0 auto;

		&__badge {
			margin-bottom: var(--space-6);
		}

		&__title {
			margin-bottom: var(--space-6);
			letter-spacing: -0.03em;
		}

		&__desc {
			font-size: clamp(1rem, 3vw, 1.25rem);
			color: var(--color-text-muted);
			margin-bottom: var(--space-8);
			max-width: 750px;
			line-height: 1.6;
		}

		&__actions {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: var(--space-4);
			margin-top: var(--space-4);

			@media (min-width: 640px) {
				flex-direction: row;
				width: auto;
				justify-content: center;
			}
		}
	}
</style>
