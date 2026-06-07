<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		interactive?: boolean;
		glow?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { interactive = false, glow = false, class: className = '', children }: Props = $props();
</script>

<div 
	class="card fx-glass {className}" 
	class:fx-card-sheen={interactive} 
	class:fx-glow-accent={glow}
	class:card--interactive={interactive}
>
	{@render children?.()}
</div>

<style lang="scss">
	.card {
		border-radius: var(--radius-md);
		padding: var(--space-6);
		transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);

		&--interactive {
			&:hover {
				transform: translateY(-2px);
				border-color: var(--color-border);
			}
		}
	}
</style>
