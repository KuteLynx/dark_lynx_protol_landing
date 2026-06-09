export interface DemoLandingPage {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	icon: string;
	href: string;
	status: 'active' | 'coming-soon';
	palette: {
		bg: string;
		surface: string;
		accent: string;
		text: string;
	};
}

export const demoLandingPages: DemoLandingPage[] = [
	{
		slug: 'restaurante',
		name: 'Brasa Norte',
		tagline: 'Restaurante de cocina al fuego',
		description:
			'Landing cálida y sensorial para restaurante local. Muestra menú, ambiente y reservas.',
		icon: 'Flame',
		href: '/demos/restaurante',
		status: 'active',
		palette: {
			bg: '#1a1410',
			surface: '#2a1f18',
			accent: '#e86a6a',
			text: '#f5efe8'
		}
	},
	{
		slug: 'peluqueria',
		name: 'Navaja & Niebla',
		tagline: 'Peluquería de estilo editorial',
		description:
			'Landing elegante para barbería o salón. Servicios, estilistas y agenda simulada.',
		icon: 'Scissors',
		href: '/demos/peluqueria',
		status: 'coming-soon',
		palette: {
			bg: '#0d0d0f',
			surface: '#1a1a1e',
			accent: '#a78bfa',
			text: '#e8e6f0'
		}
	},
	{
		slug: 'veterinaria',
		name: 'Huella Clínica Veterinaria',
		tagline: 'Veterinaria de confianza',
		description:
			'Landing limpia y profesional para clínica veterinaria. Servicios, equipo y cita mockup.',
		icon: 'Heart',
		href: '/demos/veterinaria',
		status: 'coming-soon',
		palette: {
			bg: '#0f1412',
			surface: '#1a221e',
			accent: '#6ee7b7',
			text: '#e8f0ec'
		}
	},
	{
		slug: 'playeras',
		name: 'Glitch Cotton',
		tagline: 'Ecommerce de playeras con diseño',
		description:
			'Tienda online con catálogo visual y checkout simulado. Streetwear y alto contraste.',
		icon: 'ShoppingBag',
		href: '/demos/playeras',
		status: 'coming-soon',
		palette: {
			bg: '#0a0a0f',
			surface: '#16161e',
			accent: '#a855f7',
			text: '#e8e6f0'
		}
	}
];
