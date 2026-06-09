<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		interactive?: boolean;
		glow?: boolean;
		reveal?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { interactive = false, glow = false, reveal = true, class: className = '', children }: Props = $props();

	function revealCard(node: HTMLElement, enabled: boolean) {
		let observer: IntersectionObserver | null = null;
		let initialized = false;

		function showImmediately() {
			node.classList.add('card--visible');
		}

		function init() {
			if (initialized) return;
			initialized = true;

			if (!enabled || !('IntersectionObserver' in window)) {
				showImmediately();
				return;
			}

			const rect = node.getBoundingClientRect();
			const center = rect.left + rect.width / 2;
			const fromLeft = center < window.innerWidth / 2;
			node.classList.add(fromLeft ? 'card--from-left' : 'card--from-right');

			observer = new IntersectionObserver(
				([entry]) => {
					if (!entry?.isIntersecting) return;
					node.classList.add('card--visible');
					observer?.unobserve(node);
				},
				{ threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
			);

			observer.observe(node);
		}

		init();

		return {
			update(nextEnabled: boolean) {
				enabled = nextEnabled;
				init();
			},
			destroy() {
				observer?.disconnect();
			}
		};
	}
</script>

<div
	class="card fx-glass {className}"
	class:card--reveal={reveal}
	class:fx-card-sheen={interactive}
	class:fx-glow-accent={glow}
	class:card--interactive={interactive}
	use:revealCard={reveal}
>
	{@render children?.()}
</div>

<style lang="scss">
	.card {
		border-radius: var(--radius-md);
		padding: var(--space-6);
		transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);

		&--reveal {
			opacity: 0;
			transform: translateX(var(--card-reveal-offset, 0));
			transition:
				opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1),
				transform 0.72s cubic-bezier(0.16, 1, 0.3, 1),
				border-color var(--transition-normal),
				box-shadow var(--transition-normal);
			will-change: opacity, transform;
		}

		&--from-left {
			--card-reveal-offset: -32px;
		}

		&--from-right {
			--card-reveal-offset: 32px;
		}

		&--visible {
			opacity: 1;
			transform: translateX(0);
			will-change: auto;
		}

		&--interactive {
			&:hover {
				transform: translateY(-2px);
				border-color: var(--color-border);
			}
		}

		&--visible.card--interactive:hover {
			transform: translateY(-2px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card--reveal {
			opacity: 1;
			transform: none;
			transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
		}
	}
</style>
