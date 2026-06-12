<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import SiteLayout from "$lib/layout/SiteLayout.svelte";
  import TypewriterText from "$lib/components/ui/TypewriterText.svelte";
  import favicon from "$lib/assets/favicon.png";
  import { ensureLoaded } from "$lib/journal-store.svelte";
  import { theme } from "$lib/themes";
  import MouseTrail from "$lib/layout/MouseTrail.svelte";
  import "../styles/app.scss";

  let { children } = $props();
  let showBootLoader = $state(true);

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

  // Warm-on-boot: fire journal fetch on app mount, non-blocking
  onMount(() => {
    ensureLoaded();

    const loaderTimer = setTimeout(() => {
      showBootLoader = false;
    }, 2600);

    const cleanupTheme = theme.onThemeChange(() => {
      showBootLoader = true;
      setTimeout(() => {
        showBootLoader = false;
      }, 2600);
    });

    return () => {
      clearTimeout(loaderTimer);
      cleanupTheme();
    };
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

{#if showBootLoader}
  <div
    class="boot-loader"
    aria-label="Dark Lynx Protocol loading screen"
    style="background: {theme.current.loader.backgroundGradient}"
  >
    <div class="boot-loader__panel">
      <div class="boot-loader__eyebrow mono">
        {theme.current.loader.eyebrowText}
      </div>
      <TypewriterText
        text={theme.current.loader.typewriterText}
        speed={48}
        prefix=">_"
        blink
      />
      <div class="boot-loader__bar" aria-hidden="true"></div>
    </div>
  </div>
{/if}

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

  .boot-loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: var(--space-6);
    animation: bootExit 2.6s ease forwards;
    --color-text-muted: #ffffff;
  }

  .boot-loader__panel {
    width: min(100%, 420px);
    padding: var(--space-6);
    border: 1px solid var(--color-border-soft);
    border-radius: var(--radius-md);
    background: rgba(19, 19, 19, 0.82);
    box-shadow: var(--shadow-lg), var(--shadow-glow);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: #ffffff;
  }

  .boot-loader__eyebrow {
    margin-bottom: var(--space-3);
    font-size: var(--font-size-xs);
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.7);
  }

  .boot-loader__bar {
    position: relative;
    height: 2px;
    margin-top: var(--space-5);
    overflow: hidden;
    border-radius: var(--radius-full);
    background: var(--color-border-soft);

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent,
        var(--color-accent),
        transparent
      );
      animation: bootScan 1.1s ease-in-out infinite;
    }
  }

  @keyframes bootScan {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes bootExit {
    0%,
    78% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .boot-loader,
    .boot-loader__bar::before {
      animation: none;
    }
  }
</style>
