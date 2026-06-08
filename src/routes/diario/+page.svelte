<script lang="ts">
	import { journalStore } from '$lib/journal-store.svelte';
	import Section from '$lib/layout/Section.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import TagList from '$lib/components/ui/TagList.svelte';
	import TerminalText from '$lib/components/ui/TerminalText.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t, locale } from '$lib/i18n';

	function formatDate(dateStr: string): string {
		const [y, m, d] = dateStr.split('-');
		const months: Record<string, string> = {
			'01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
			'05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
			'09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic'
		};
		return `${parseInt(d)} ${months[m] || m}, ${y}`;
	}

	function localTitle(entry: { title_es: string; title_en: string | null }): string {
		const lang = locale.current;
		if (lang === 'en' && entry.title_en) return entry.title_en;
		return entry.title_es;
	}

	function localContent(entry: { content_es: string; content_en: string | null }): string {
		const lang = locale.current;
		if (lang === 'en' && entry.content_en) return entry.content_en;
		return entry.content_es;
	}

	function contentParagraphs(text: string): string[] {
		return text.split('\n\n').filter(p => p.trim());
	}
</script>

<SeoHead title={t('seo.journal.title')} description={t('seo.journal.desc')} path="/diario" noindex />

<Section size="md">
	<div class="journal-header">
		<div class="journal-header__badge badge text-accent mono">{t('journal.badge')}</div>
		<h1 class="journal-header__title font-glow">{t('journal.title')}</h1>
		<p class="journal-header__subtitle text-muted mono">
			<TerminalText text={t('journal.subtitle')} />
		</p>
	</div>

	<div class="journal-feed">
		{#if journalStore.loading}
			<!-- Skeleton loading state -->
			{#each Array(3) as _, i}
				<div class="skeleton-wrapper" style="animation-delay: {i * 0.1}s">
					<Card class="journal-entry skeleton-entry">
						<div class="skeleton-line skeleton-meta"></div>
						<div class="skeleton-line skeleton-title"></div>
						<div class="skeleton-line skeleton-body"></div>
						<div class="skeleton-line skeleton-body short"></div>
					</Card>
				</div>
			{/each}
		{:else if journalStore.error}
			<div class="journal-feed__error mono">
				<span class="error-icon">⚠</span>
				<p>Error al cargar el diario: {journalStore.error}</p>
			</div>
		{:else if journalStore.entries.length === 0}
			<div class="journal-feed__empty mono text-muted">
				{t('journal.emptyState')}
			</div>
		{:else}
			{#each journalStore.entries as entry, index (entry.id)}
				<div class="entry-wrapper" style="animation-delay: {index * 0.08}s">
					<Card class="journal-entry">
						<div class="journal-entry__meta mono text-accent">
							<time datetime={entry.date}>{formatDate(entry.date)}</time>
							<span class="text-subtle">| {entry.author}</span>
						</div>
						<h2 class="journal-entry__title">{localTitle(entry)}</h2>
						<div class="journal-entry__body">
							{#each contentParagraphs(localContent(entry)) as paragraph}
								<p>{paragraph}</p>
							{/each}
						</div>
						{#if entry.tags && entry.tags.length > 0}
							<div class="journal-entry__tags">
								<TagList tags={entry.tags} />
							</div>
						{/if}
					</Card>
				</div>
			{/each}
		{/if}
	</div>
</Section>

<style lang="scss">
	.journal-header {
		margin-bottom: var(--space-12);
		text-align: left;

		&__badge {
			margin-bottom: var(--space-4);
			display: inline-block;
		}

		&__title {
			font-size: var(--font-size-page-title);
			margin-bottom: var(--space-4);
		}

		&__subtitle {
			font-size: var(--font-size-small);
		}
	}

	.journal-feed {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);

		&__empty {
			text-align: center;
			padding: var(--space-12);
			border: 1px dashed var(--color-border-soft);
			border-radius: var(--radius-md);
		}

		&__error {
			text-align: center;
			padding: var(--space-12);
			border: 1px solid var(--color-error, #ff4444);
			border-radius: var(--radius-md);
			color: var(--color-error, #ff4444);

			.error-icon {
				font-size: 2rem;
				display: block;
				margin-bottom: var(--space-4);
			}
		}
	}

	:global(.journal-entry) {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.entry-wrapper {
		animation: journalFadeIn 0.5s ease-out both;
	}

	.skeleton-wrapper {
		animation: journalFadeIn 0.5s ease-out both;
	}

	@keyframes journalFadeIn {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.journal-entry {
		&__meta {
			font-size: var(--font-size-xs);
			border-bottom: 1px solid var(--color-border-soft);
			padding-bottom: var(--space-2);
		}

		&__title {
			font-size: var(--font-size-h3);
			margin: 0;
			color: var(--color-text);
		}

		&__body {
			font-size: var(--font-size-body);
			color: var(--color-text-muted);
			line-height: 1.7;

			p {
				margin: 0 0 var(--space-3) 0;
			}

			p:last-child {
				margin-bottom: 0;
			}
		}

		&__tags {
			margin-top: var(--space-2);
		}
	}

	/* Skeleton loading */
	:global(.skeleton-entry) {
		pointer-events: none;
	}

	.skeleton-line {
		height: 1rem;
		border-radius: var(--radius-sm, 4px);
		background: linear-gradient(
			90deg,
			var(--color-border-soft) 25%,
			var(--color-bg-card, rgba(255,255,255,0.05)) 50%,
			var(--color-border-soft) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s ease-in-out infinite;
	}

	.skeleton-meta {
		width: 30%;
		height: 0.75rem;
	}

	.skeleton-title {
		width: 70%;
		height: 1.5rem;
		margin-top: var(--space-2);
	}

	.skeleton-body {
		width: 100%;
		margin-top: var(--space-2);

		&.short {
			width: 60%;
		}
	}

	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
</style>
