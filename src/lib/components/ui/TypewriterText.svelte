<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		text: string;
		speed?: number;
		delay?: number;
		prefix?: string;
		blink?: boolean;
	}

	let { text, speed = 50, delay = 0, prefix = '', blink = false }: Props = $props();

	let displayedText = $state('');
	let isTyping = $state(false);
	let isComplete = $state(false);

	onMount(() => {
		let timeoutId: ReturnType<typeof setTimeout>;
		
		const typeWriter = (index: number) => {
			if (index < text.length) {
				displayedText += text.charAt(index);
				timeoutId = setTimeout(() => typeWriter(index + 1), speed);
			} else {
				isTyping = false;
				isComplete = true;
			}
		};

		timeoutId = setTimeout(() => {
			isTyping = true;
			typeWriter(0);
		}, delay);

		return () => clearTimeout(timeoutId);
	});
</script>

<div class="typewriter-text mono">
	{#if prefix}
		<span class="typewriter-text__prefix text-accent">{prefix}</span>
	{/if}
	<span class="typewriter-text__content">{displayedText}</span>
	{#if blink || isTyping || (!isComplete && !blink)}
		<span class="fx-cursor-blink"></span>
	{/if}
</div>

<style lang="scss">
	.typewriter-text {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		line-height: 1.5;

		&__prefix {
			margin-right: var(--space-2);
			font-weight: 700;
		}
	}
</style>
