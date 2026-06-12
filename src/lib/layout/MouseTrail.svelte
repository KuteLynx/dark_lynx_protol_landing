<script lang="ts">
  import { onMount } from "svelte";
  import { theme } from "$lib/themes";

  let canvas: HTMLCanvasElement;
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  $effect(() => {
    theme.id; // Subscribe
    if (!mounted || !canvas) return;
    if (theme.current.id !== "artisanal_sketchbook") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    type Point = { x: number; y: number; timestamp: number };
    let points: Point[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const lifetime = 1200; // ms

      points = points.filter((p) => now - p.timestamp < lifetime);

      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          // Calculate opacity based on age
          const age = now - p2.timestamp;
          const opacity = Math.max(0, 1 - age / lifetime);

          // Main stroke
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(68, 71, 72, ${opacity * 0.25})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Subtle sketchy offset stroke
          ctx.beginPath();
          ctx.moveTo(
            p1.x + (Math.random() * 2 - 1),
            p1.y + (Math.random() * 2 - 1),
          );
          ctx.lineTo(
            p2.x + (Math.random() * 2 - 1),
            p2.y + (Math.random() * 2 - 1),
          );
          ctx.strokeStyle = `rgba(116, 120, 120, ${opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  });
</script>

{#if theme.current.id === "artisanal_sketchbook"}
  <canvas bind:this={canvas} class="mouse-trail-canvas" aria-hidden="true"
  ></canvas>
{/if}

<style lang="scss">
  .mouse-trail-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9998;
  }
</style>
