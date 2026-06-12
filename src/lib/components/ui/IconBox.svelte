<script lang="ts">
	import * as Icons from '@lucide/svelte';

	interface Props {
		name: string;
		size?: number;
	}

	let { name, size = 24 }: Props = $props();

	function getIconComponent(iconName: string) {
		return (Icons as any)[iconName] || Icons.HelpCircle;
	}

	let Icon = $derived(getIconComponent(name));
</script>

<div class="icon-box text-accent fx-panel-glow">
	<Icon {size} />
</div>

<style lang="scss">
	.icon-box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background-color: var(--color-bg-deep);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.2);
		flex-shrink: 0;
	}
</style>
