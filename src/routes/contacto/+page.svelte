<script lang="ts">
	import { onMount } from 'svelte';
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t } from '$lib/i18n';

	let isSubmitting = $state(false);
	let success = $state(false);
	let error = $state('');

	const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
	const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '';

	let turnstileContainer!: HTMLDivElement;
	let widgetId: string | undefined;

	onMount(() => {
		if (!TURNSTILE_SITE_KEY) return;

		let cancelled = false;

		// Load Turnstile script dynamically (only on this page)
		function loadTurnstileScript(): Promise<void> {
			return new Promise((resolve, reject) => {
				if ((window as any).turnstile) {
					resolve();
					return;
				}
				const s = document.createElement('script');
				s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
				s.async = true;
				s.defer = true;
				s.onload = () => resolve();
				s.onerror = () => reject(new Error('Failed to load Turnstile script'));
				document.head.appendChild(s);
			});
		}

		async function renderTurnstile() {
			if (cancelled) return;
			try {
				await loadTurnstileScript();
			} catch {
				return;
			}
			if (cancelled) return;
			const turnstile = (window as any).turnstile;
			if (!turnstile) return;
			widgetId = turnstile.render(turnstileContainer, {
				sitekey: TURNSTILE_SITE_KEY,
				theme: 'dark'
			});
		}

		renderTurnstile();

		return () => {
			cancelled = true;
			if (widgetId !== undefined) {
				const turnstile = (window as any).turnstile;
				if (turnstile) {
					turnstile.remove(widgetId);
				}
			}
		};
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';

		if (!TURNSTILE_SITE_KEY || !CONTACT_API_URL) {
			error = 'Contact form is missing environment configuration.';
			return;
		}

		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const name = String(data.get('name') || '').trim();
		const email = String(data.get('email') || '').trim();
		const subject = String(data.get('subject') || '').trim();
		const message = String(data.get('message') || '').trim();
		const turnstileToken = String(data.get('cf-turnstile-response') || '').trim();

		if (!name || !email || !subject || !message) {
			error = 'Missing fields.';
			return;
		}

		if (!turnstileToken) {
			error = 'Please complete the captcha.';
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch(CONTACT_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					message: `Subject: ${subject}\n\n${message}`,
					turnstileToken
				})
			});

			const result = await response.json().catch(() => ({}));

			if (!response.ok || !result.success) {
				throw new Error(result.error || 'Contact request failed.');
			}

			success = true;
			form.reset();
		} catch (submitError) {
			error = submitError instanceof Error ? submitError.message : 'Contact request failed.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<SeoHead title={t('seo.contact.title')} description={t('seo.contact.desc')} path="/contacto" />

<Section size="md">
	<PageHero
		overline={t('contact.hero.overline')}
		title={t('contact.hero.title')}
		description={t('contact.hero.description')}
	/>
</Section>

<Section size="sm">
	<Card class="contact-card" glow>
		{#if success}
			<div class="contact-success">
				<p class="mono text-accent">{t('contact.form.success')}</p>
			</div>
		{:else}
			{#if error}
				<div class="contact-error mono text-danger">
					{error || t('contact.form.error')}
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="contact-form">
				<div class="form-group">
					<label for="name" class="mono text-accent">{t('contact.form.name')}</label>
					<input type="text" id="name" name="name" required class="terminal-input mono" />
				</div>

				<div class="form-group">
					<label for="email" class="mono text-accent">{t('contact.form.email')}</label>
					<input type="email" id="email" name="email" required class="terminal-input mono" />
				</div>

				<div class="form-group">
					<label for="subject" class="mono text-accent">{t('contact.form.subject')}</label>
					<input type="text" id="subject" name="subject" required class="terminal-input mono" />
				</div>

				<div class="form-group">
					<label for="message" class="mono text-accent">{t('contact.form.message')}</label>
					<textarea id="message" name="message" rows="5" required class="terminal-input mono"></textarea>
				</div>

				{#if TURNSTILE_SITE_KEY}
					<div bind:this={turnstileContainer}></div>
				{:else}
					<div class="contact-error mono text-danger">
						Missing VITE_TURNSTILE_SITE_KEY.
					</div>
				{/if}

				<div class="form-actions">
					<Button type="submit" variant="primary" size="lg" disabled={isSubmitting || !TURNSTILE_SITE_KEY || !CONTACT_API_URL}>
						{isSubmitting ? t('cta.sending') : t('cta.sendData')}
					</Button>
				</div>
			</form>

			<p class="contact-direct mono">
			  {t('contact.form.directLineBefore')}
			  <a href="mailto:contact@darklynxprotocol.com" class="text-accent">contact@darklynxprotocol.com</a>
			  {t('contact.form.directLineAfter')}
			</p>
			{/if}
			</Card>
</Section>

<style lang="scss">
	:global(.contact-card) {
		padding: var(--space-8) !important;
		background: rgba(19, 19, 19, 0.6);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);

		label {
			font-size: var(--font-size-xs);
		}
	}

	.terminal-input {
		background: var(--color-bg-deep);
		border: 1px solid var(--color-border);
		color: var(--color-text);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
		font-size: var(--font-size-small);

		&:focus {
			outline: none;
			border-color: var(--color-accent);
			box-shadow: 0 0 10px rgba(0, 255, 65, 0.1);
		}
	}

	textarea.terminal-input {
		resize: vertical;
		min-height: 120px;
	}

	.form-actions {
		margin-top: var(--space-4);
		display: flex;
		justify-content: flex-end;

		@media (max-width: 767px) {
			justify-content: center;
		}
	}

	.contact-success {
		text-align: center;
		padding: var(--space-12) 0;
		font-size: var(--font-size-body);
	}

	.contact-error {
		padding: var(--space-4);
		margin-bottom: var(--space-6);
		border: 1px solid var(--color-danger);
		background: rgba(255, 180, 171, 0.1);
		border-radius: var(--radius-sm);
	}

	.contact-direct {
		margin-top: var(--space-6);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border);
		font-size: var(--font-size-xs);
		color: var(--color-text-muted, rgba(255, 255, 255, 0.5));
		text-align: center;
		line-height: 1.6;

		a {
			color: var(--color-accent);
			text-decoration: underline;
			text-underline-offset: 2px;

			&:hover {
				text-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
			}
		}
	}
</style>
