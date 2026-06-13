<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import SiteLayout from "$lib/layout/SiteLayout.svelte";
  import favicon from "$lib/assets/favicon.png";
  import { healthPing } from "$lib/journal-store.svelte";
  import { theme } from "$lib/themes";
  import MouseTrail from "$lib/layout/MouseTrail.svelte";
  import "../styles/app.scss";

  let { children } = $props();

  let mouseX = $state(-1000);
  let mouseY = $state(-1000);
  let isMouseMoving = $state(false);
  let mouseTimeout: ReturnType<typeof setTimeout> | undefined;

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      isMouseMoving = false;
    }, 100); // Reduced timeout so it starts fading almost immediately when mouse stops
  }

  let background: "grid" | "dots" | "cyber" | "none" | "paper" = $derived.by(
    () => {
      if (theme.current.id === "urban_night") return "none";
      if (theme.current.id === "artisanal_sketchbook") return "paper";
      const path = $page.url.pathname;
      if (path === "/servicios") return "grid";
      if (path === "/sobre-mi" || path === "/diario") return "cyber";
      return "dots";
    },
  );

  // Wake backend server on app mount, non-blocking
  onMount(() => {
    healthPing();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onmousemove={handleMouseMove} />

<MouseTrail />

<div
  class="global-mouse-light"
  style="transform: translate({mouseX - 250}px, {mouseY -
    250}px); opacity: {isMouseMoving ? 1 : 0};"
  aria-hidden="true"
></div>

<SiteLayout {background}>
  {@render children()}
</SiteLayout>

<style lang="scss">
  .global-mouse-light {
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 500px;
    pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--mouse-light, transparent) 0%,
      transparent 65%
    );
    transition: opacity 1s ease-out;
    z-index: 9998;
    will-change: transform, opacity;
    mix-blend-mode: screen;
  }
</style>
