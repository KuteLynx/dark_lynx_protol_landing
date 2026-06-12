<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { theme } from "$lib/themes";

  // --- Configuration Constants ---
  const GLITCH_INTERVAL_MS = 1500;
  const GLITCH_MAX_ELEMENTS = 10;
  const GLITCH_MIN_ELEMENTS = 10;
  const GLITCH_DURATION_MS = 400;
  const GLITCH_SELECTOR =
    'h1, h2, h3, .button, .img, .card, .badge, [class*="section"], [class*="bento"]';
  const GLITCH_COOLDOWN_MS = 12000;

  let intervalId: number | ReturnType<typeof setInterval>;
  let cooldowns = new Map<Element, number>();

  onMount(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    intervalId = setInterval(triggerGlitch, GLITCH_INTERVAL_MS);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    // Cleanup any active glitches if component is destroyed
    if (typeof document !== "undefined") {
      const animClass = theme.current.effects.globalAnimationClass;
      if (animClass) {
        document.querySelectorAll(`.${animClass}`).forEach((el) => {
          el.classList.remove(animClass);
        });
      }
    }
  });

  function triggerGlitch() {
    const now = Date.now();

    // Clean up old cooldowns
    for (const [el, time] of cooldowns.entries()) {
      if (now - time > GLITCH_COOLDOWN_MS) {
        cooldowns.delete(el);
      }
    }

    // Query all eligible elements
    const allEligible = document.querySelectorAll(GLITCH_SELECTOR);

    const animClass = theme.current.effects.globalAnimationClass;
    if (!animClass) return;

    // Filter out those currently glitching or on cooldown
    const available = Array.from(allEligible).filter((el) => {
      return !el.classList.contains(animClass) && !cooldowns.has(el);
    });

    if (available.length === 0) return;

    // Pick how many to glitch this tick
    const count = Math.min(
      available.length,
      Math.floor(
        Math.random() * (GLITCH_MAX_ELEMENTS - GLITCH_MIN_ELEMENTS + 1),
      ) + GLITCH_MIN_ELEMENTS,
    );

    // Shuffle and take 'count' elements
    const selected = available.sort(() => 0.5 - Math.random()).slice(0, count);

    selected.forEach((el) => {
      // Set duration variable for CSS to use
      (el as HTMLElement).style.setProperty(
        "--glitch-duration",
        `${GLITCH_DURATION_MS}ms`,
      );

      // Store original text for the pseudoelements to use, if it's a text node and doesn't already have one
      if (!el.getAttribute("data-glitch-text") && el.textContent) {
        // Only use text content if it's reasonably short to avoid massive pseudo-elements
        const text = el.textContent.trim();
        if (text.length > 0 && text.length < 100) {
          el.setAttribute("data-glitch-text", text);
        }
      }

      el.classList.add(animClass);

      // Listen for animation end to clean up
      const handleAnimationEnd = () => {
        el.classList.remove(animClass);
        cooldowns.set(el, Date.now());
        el.removeEventListener("animationend", handleAnimationEnd);
      };

      el.addEventListener("animationend", handleAnimationEnd);

      // Fallback cleanup just in case animationend doesn't fire
      setTimeout(() => {
        if (el.classList.contains(animClass)) {
          el.classList.remove(animClass);
          cooldowns.set(el, Date.now());
          el.removeEventListener("animationend", handleAnimationEnd);
        }
      }, GLITCH_DURATION_MS + 100);
    });
  }
</script>
