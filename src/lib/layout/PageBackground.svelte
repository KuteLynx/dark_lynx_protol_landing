<script lang="ts">
	interface Props {
		variant?: 'dots' | 'grid' | 'cyber';
	}

	let { variant = 'dots' }: Props = $props();
</script>

<div class="page-background bg-{variant}"></div>

<style lang="scss">
	.page-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: var(--z-background);
		pointer-events: none;
	}
</style>
