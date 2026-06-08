<script lang="ts">
	import { locale } from '$lib/i18n';

	type Props = {
		title: string;
		description: string;
		path?: string;
		noindex?: boolean;
	};

	let { title, description, path = '/', noindex = false }: Props = $props();

	const siteUrl = 'https://darklynxprotocol.com';
	const siteName = 'Dark Lynx Protocol';
	const imageUrl = `${siteUrl}/og-image.png`;
	let pageUrl = $derived(`${siteUrl}${path}`);
	let alternateEs = $derived(`${siteUrl}${path}`);
	let alternateEn = $derived(`${siteUrl}${path}?lang=en`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
	<meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
	<link rel="canonical" href={pageUrl} />
	<link rel="alternate" hreflang="es-MX" href={alternateEs} />
	<link rel="alternate" hreflang="en" href={alternateEn} />
	<link rel="alternate" hreflang="x-default" href={alternateEs} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content={locale.current === 'en' ? 'en_US' : 'es_MX'} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Dark Lynx Protocol, estudio de desarrollo web en Querétaro" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
