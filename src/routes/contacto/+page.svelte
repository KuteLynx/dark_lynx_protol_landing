<script lang="ts">
	import Section from '$lib/layout/Section.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	
	let isSubmitting = $state(false);
	
	// TODO: Replace with real Turnstile Site Key from Cloudflare
	const TURNSTILE_SITE_KEY = "1x00000000000000000000AA"; // Testing key that always passes

	function handleEnhance() {
		isSubmitting = true;
		return async ({ update }: { update: any }) => {
			await update();
			isSubmitting = false;
		};
	}
</script>

<svelte:head>
	<title>{t('nav.contact')} — Dark Lynx Protocol</title>
</svelte:head>

<Section size="md">
	<PageHero 
		overline={t('contact.hero.overline')}
		title={t('contact.hero.title')}
		description={t('contact.hero.description')}
	/>
</Section>

<Section size="sm">
	<Card class="contact-card" glow>
		{#if form?.success}
			<div class="contact-success fx-glitch" data-text={t('contact.form.success')}>
				<p class="mono text-accent">{t('contact.form.success')}</p>
			</div>
		{:else}
			{#if form?.error}
				<div class="contact-error mono text-danger">
					{t('contact.form.error')}
				</div>
			{/if}
			
			<form method="POST" use:enhance={handleEnhance} class="contact-form">
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
				
				<!-- Turnstile Widget -->
				<div class="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY}></div>

				<div class="form-actions">
					<Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
						{isSubmitting ? t('cta.sending') : t('cta.sendData')}
					</Button>
				</div>
			</form>
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
</style>
