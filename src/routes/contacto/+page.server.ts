import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, platform }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const subject = data.get('subject');
		const message = data.get('message');
		const token = data.get('cf-turnstile-response');

		if (!name || !email || !subject || !message) {
			return fail(400, { error: true, message: 'Missing fields' });
		}

		// Cloudflare Environment Bindings (Secrets)
		// When running via Wrangler / Cloudflare Pages, these will be available in platform.env
		// TODO: uncomment and use platform.env variables once deployed
		// const turnstileSecret = platform?.env?.TURNSTILE_SECRET_KEY;
		// const resendApiKey = platform?.env?.RESEND_API_KEY;

		const turnstileSecret = '1x0000000000000000000000000000000AA'; // testing secret

		// Validate Turnstile
		const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				secret: turnstileSecret || '',
				response: token?.toString() || ''
			})
		});
		
		const turnstileOutcome = await turnstileRes.json();
		if (!turnstileOutcome.success) {
			return fail(400, { error: true, message: 'Captcha verification failed' });
		}

		// Send Email using Resend
		/*
		try {
			const resendResponse = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${resendApiKey}`
				},
				body: JSON.stringify({
					from: 'Dark Lynx <onboarding@resend.dev>', // Update with verified domain
					to: 'contact@darklynxprotocol.com',
					subject: `[CONTACTO] ${subject} - ${name}`,
					text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
				})
			});

			if (!resendResponse.ok) {
				return fail(500, { error: true, message: 'Email service error' });
			}
		} catch (error) {
			return fail(500, { error: true, message: 'Internal server error' });
		}
		*/

		// Simulating successful network request for now
		await new Promise(resolve => setTimeout(resolve, 1500));

		return { success: true };
	}
} satisfies Actions;
