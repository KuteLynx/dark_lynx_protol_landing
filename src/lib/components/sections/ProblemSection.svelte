<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
</script>

<div class="problem-section">
	<SectionHeader 
		overline="EL PROBLEMA"
		title="La Trampa de la Reparación Barata"
		description="Comprar plantillas prediseñadas o delegar en agencias tradicionales que pegan miles de utilidades CSS suele terminar igual: un código frágil que nadie puede mantener y un rendimiento web deficiente."
	/>

	<div class="grid-2">
		<Card class="problem-card problem-card--red">
			<h3 class="problem-card__title mono text-danger">[SÍNTOMA_DE_ALERTA]</h3>
			<ul class="problem-card__list">
				<li>Páginas que tardan más de 3 segundos en cargar, perdiendo un 40% de visitas.</li>
				<li>Código espagueti con clases duplicadas e imposibles de leer o refactorizar.</li>
				<li>Dependencia absoluta de plugins externos y scripts pesados que rompen el diseño.</li>
				<li>Presupuestos que se desvanecen en parches continuos sin solucionar el fondo.</li>
			</ul>
		</Card>

		<Card class="problem-card problem-card--green">
			<h3 class="problem-card__title mono text-accent">[EL_PROTOCOLO]</h3>
			<ul class="problem-card__list">
				<li>Optimización obsesiva para Core Web Vitals (LCP, INP, CLS) y tiempos sub-segundo.</li>
				<li>Componentes Svelte limpios, organizados y con estilos SCSS encapsulados.</li>
				<li>Carga mínima de dependencias: solo lo estrictamente necesario.</li>
				<li>Código propietario que puedes extender y mantener en el futuro de forma autónoma.</li>
			</ul>
		</Card>
	</div>
</div>

<style lang="scss">
	:global(.problem-card) {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);

		&.problem-card--red {
			border-color: rgba(255, 180, 171, 0.2);
			&:hover {
				border-color: var(--color-danger);
			}
		}

		&.problem-card--green {
			border-color: rgba(0, 255, 65, 0.2);
			&:hover {
				border-color: var(--color-accent);
			}
		}
	}

	.problem-card {
		&__title {
			font-size: var(--font-size-small);
			letter-spacing: 0.05em;
		}

		&__list {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: var(--space-3);

			li {
				position: relative;
				padding-left: var(--space-4);
				font-size: var(--font-size-small);
				color: var(--color-text-muted);
				line-height: 1.5;

				&::before {
					content: '•';
					position: absolute;
					left: 0;
					top: 0;
				}
			}
		}

		&--red &__list li::before {
			color: var(--color-danger);
		}

		&--green &__list li::before {
			color: var(--color-accent);
		}
	}
</style>
