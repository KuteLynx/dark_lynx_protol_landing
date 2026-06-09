export interface MenuItem {
	name: string;
	description: string;
	price: string;
	tag: string | null;
}

export interface ExperienceItem {
	icon: string;
	title: string;
	description: string;
}

export interface GalleryItem {
	alt: string;
}

export interface HourBlock {
	day: string;
	time: string;
}

export interface LocationData {
	address: string;
	hours: HourBlock[];
	phone: string;
}

export interface CtaData {
	title: string;
	description: string;
	buttonLabel: string;
	buttonHref: string;
}

export interface RestauranteData {
	name: string;
	tagline: string;
	description: string;
	nav: { label: string; href: string }[];
	menu: MenuItem[];
	experiences: ExperienceItem[];
	gallery: GalleryItem[];
	location: LocationData;
	cta: CtaData;
}

export const restauranteData: RestauranteData = {
	name: 'Brasa Norte',
	tagline: 'Cocina al fuego para noches que se recuerdan',
	description:
		'Restaurante local moderno con cocina abierta, ingredientes de temporada y ambiente íntimo.',
	nav: [
		{ label: 'Inicio', href: '#inicio' },
		{ label: 'Menú', href: '#menu' },
		{ label: 'Experiencia', href: '#experiencia' },
		{ label: 'Galería', href: '#galeria' },
		{ label: 'Ubicación', href: '#ubicacion' },
		{ label: 'Reservar', href: '#reservar' }
	],
	menu: [
		{
			name: 'Costilla ahumada 12 horas',
			description:
				'Cocción lenta con rub de chiles secos, acompañada de elote asado y salsa borracha.',
			price: '$320',
			tag: 'Favorito'
		},
		{
			name: 'Filete de res a la parrilla',
			description: 'Corte premium sellado al carbón, puré de papa trufado y vegetales de temporada.',
			price: '$380',
			tag: 'Premium'
		},
		{
			name: 'Pulpo al carbón',
			description: 'Tentáculo de pulpo braseado, hummus de chipotle y microgreens.',
			price: '$290',
			tag: null
		},
		{
			name: 'Tiramisú de mezcal',
			description: 'Versión de la casa con bizcocho bañado en mezcal artesanal y café de olla.',
			price: '$140',
			tag: 'Nuevo'
		}
	],
	experiences: [
		{
			icon: 'Flame',
			title: 'Cocina al fuego',
			description:
				'Parrilla abierta y ahumador como protagonistas. Cada platillo pasa por fuego real.'
		},
		{
			icon: 'Leaf',
			title: 'Ingredientes de temporada',
			description:
				'Trabajamos con productores locales. El menú cambia según lo que la tierra ofrece.'
		},
		{
			icon: 'Users',
			title: 'Grupos y eventos',
			description:
				'Espacio privado para cenas íntimas, celebraciones y reuniones corporativas hasta 40 personas.'
		}
	],
	gallery: [
		{ alt: 'Interior del restaurante con iluminación cálida' },
		{ alt: 'Parrilla abierta con llamas' },
		{ alt: 'Platillo de costilla ahumada emplatado' },
		{ alt: 'Barra de cócteles con mezcal' },
		{ alt: 'Mesa servida para cena' },
		{ alt: 'Chef preparando filete' }
	],
	location: {
		address: 'Av. Constitución 234, Centro Histórico, Querétaro',
		hours: [
			{ day: 'Martes – Jueves', time: '13:00 – 22:00' },
			{ day: 'Viernes – Sábado', time: '13:00 – 00:00' },
			{ day: 'Domingo', time: '13:00 – 18:00' },
			{ day: 'Lunes', time: 'Cerrado' }
		],
		phone: '+52 442 123 4567'
	},
	cta: {
		title: 'Convierte visitas en reservas con una landing clara.',
		description:
			'Esta es una demo de landing page para restaurante creada por Dark Lynx Protocol. Sin backend, sin formularios reales, solo diseño y experiencia.',
		buttonLabel: 'Ver cómo lo hacemos para tu negocio',
		buttonHref: '/servicios/landing-pages'
	}
};
