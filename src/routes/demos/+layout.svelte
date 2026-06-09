<script lang="ts">
	import MockupNotice from '$lib/components/demos/MockupNotice.svelte';

	let { children } = $props();
</script>

{@render children()}
<MockupNotice />
