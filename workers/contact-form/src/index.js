const json = (data, status = 200, corsHeaders = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });

const getCorsHeaders = (request, env) => {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = [
    env.ALLOWED_ORIGIN,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ].filter(Boolean);

  const allowOrigin = allowedOrigins.includes(origin) ? origin : env.ALLOWED_ORIGIN;

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

async function verifyTurnstile(token, request, env) {
  const ip = request.headers.get('CF-Connecting-IP');
  const formData = new FormData();
  formData.append('secret', env.TURNSTILE_SECRET_KEY);
  formData.append('response', token);

  if (ip) {
    formData.append('remoteip', ip);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

async function sendEmail({ name, email, message }, env) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `"${env.FROM_NAME}" <${env.FROM_EMAIL}>`,
      to: [env.TO_EMAIL],
      reply_to: email,
      subject: `Nuevo mensaje desde Dark Lynx Protocol: ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #e5e7eb; background: #050505; padding: 24px; border-radius: 16px;">
          <h1 style="color: #a78bfa; margin-top: 0;">Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #111827; border: 1px solid #374151; border-radius: 12px; padding: 16px; line-height: 1.6;">
            ${safeMessage}
          </div>
        </div>
      `,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.message || 'Resend rejected the email request');
  }

  return result;
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ success: false, error: 'Method not allowed' }, 405, corsHeaders);
    }

    if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
      return json({ success: false, error: 'Worker secrets are not configured' }, 500, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ success: false, error: 'Invalid JSON body' }, 400, corsHeaders);
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const turnstileToken = String(body.turnstileToken || '').trim();

    if (!name || !email || !message || !turnstileToken) {
      return json({ success: false, error: 'All fields are required' }, 400, corsHeaders);
    }

    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return json({ success: false, error: 'Submitted data is too long' }, 400, corsHeaders);
    }

    if (!isValidEmail(email)) {
      return json({ success: false, error: 'Invalid email address' }, 400, corsHeaders);
    }

    const turnstile = await verifyTurnstile(turnstileToken, request, env);

    if (!turnstile.success) {
      return json({ success: false, error: 'Turnstile verification failed' }, 400, corsHeaders);
    }

    try {
      await sendEmail({ name, email, message }, env);
      return json({ success: true }, 200, corsHeaders);
    } catch (error) {
      return json({ success: false, error: error.message || 'Failed to send email' }, 502, corsHeaders);
    }
  },
};
