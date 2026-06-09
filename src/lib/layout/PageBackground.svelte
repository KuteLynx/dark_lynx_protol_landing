<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		variant?: 'dots' | 'grid' | 'cyber';
	}

	let { variant = 'dots' }: Props = $props();

	let canvas: HTMLCanvasElement;
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	// Re-run the canvas animation whenever the variant changes or the component mounts
	$effect(() => {
		if (!mounted || !canvas) return;

		const currentVariant = variant;

		// No iniciar animación en móvil (< 768px)
		const isMobile = window.matchMedia('(max-width: 767px)').matches;
		if (isMobile) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = window.innerWidth;
		let height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		let mouse = { x: -1000, y: -1000 };
		let time = 0;
		
		const handleMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		const handleResize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);
		
		let animationId: number;

		if (currentVariant === 'grid') {
			// Grid variant: interactive floor tile squares that grow, pulse, and glow green on hover
			const cellSize = 40;
			const glowRadius = 200;

			// Track cell activation state for persistent glow trail
			const cols = Math.ceil(width / cellSize) + 1;
			const rows = Math.ceil(height / cellSize) + 1;
			let cellGlow: Float32Array = new Float32Array(cols * rows);

			const drawGrid = () => {
				time += 0.016;
				ctx.clearRect(0, 0, width, height);

				const currentCols = Math.ceil(width / cellSize) + 1;
				const currentRows = Math.ceil(height / cellSize) + 1;

				for (let col = 0; col < currentCols; col++) {
					for (let row = 0; row < currentRows; row++) {
						const x = col * cellSize;
						const y = row * cellSize;

						// Center of the cell
						const cx = x + cellSize / 2;
						const cy = y + cellSize / 2;

						// Distance from mouse
						const dx = mouse.x - cx;
						const dy = mouse.y - cy;
						const dist = Math.sqrt(dx * dx + dy * dy);

						const cellIdx = col * currentRows + row;

						// Target glow based on mouse proximity
						let targetGlow = 0;
						if (dist < glowRadius) {
							targetGlow = 1 - dist / glowRadius;
						}

						// Smooth glow transitions (ramp up faster, decay slower for trail effect)
						if (cellIdx < cellGlow.length) {
							if (targetGlow > cellGlow[cellIdx]) {
								cellGlow[cellIdx] += (targetGlow - cellGlow[cellIdx]) * 0.15;
							} else {
								cellGlow[cellIdx] += (targetGlow - cellGlow[cellIdx]) * 0.03;
							}
						}

						const glow = cellIdx < cellGlow.length ? cellGlow[cellIdx] : 0;

						// Base cell properties
						const baseInset = 2;
						const growAmount = glow * 3;
						const inset = Math.max(0.5, baseInset - growAmount);

						// Ambient wave animation for subtle life
						const wave = Math.sin(time * 0.8 + col * 0.3 + row * 0.3) * 0.5 + 0.5;
						const ambientPulse = wave * 0.03;

						// Base border (subtle grid lines)
						const borderOpacity = 0.08 + ambientPulse;
						ctx.strokeStyle = `rgba(59, 75, 55, ${borderOpacity})`;
						ctx.lineWidth = 0.5;
						ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);

						if (glow > 0.01) {
							// Activated cell: fill with green glow
							const fillOpacity = glow * 0.25;
							ctx.fillStyle = `rgba(0, 255, 65, ${fillOpacity})`;
							ctx.fillRect(x + inset, y + inset, cellSize - inset * 2, cellSize - inset * 2);

							// Bright border on active cells
							const edgeOpacity = glow * 0.6;
							ctx.strokeStyle = `rgba(0, 255, 65, ${edgeOpacity})`;
							ctx.lineWidth = 1 + glow * 1.5;
							ctx.strokeRect(x + inset, y + inset, cellSize - inset * 2, cellSize - inset * 2);

							// Inner highlight shine (floor tile reflection)
							if (glow > 0.3) {
								const shineOpacity = (glow - 0.3) * 0.4;
								const shineGrad = ctx.createLinearGradient(x, y, x, y + cellSize);
								shineGrad.addColorStop(0, `rgba(0, 255, 65, ${shineOpacity})`);
								shineGrad.addColorStop(0.5, `rgba(0, 255, 65, ${shineOpacity * 0.3})`);
								shineGrad.addColorStop(1, `rgba(0, 255, 65, 0)`);
								ctx.fillStyle = shineGrad;
								ctx.fillRect(x + inset, y + inset, cellSize - inset * 2, cellSize - inset * 2);
							}
						}
					}
				}

				animationId = requestAnimationFrame(drawGrid);
			};

			drawGrid();

		} else if (currentVariant === 'cyber') {
			// Cyber variant: dots with mouse interaction and smooth decay
			const spacing = 80;
			const baseRadius = 2;

			// Pre-allocate array for state
			const cyberGlow = new Float32Array(30000); 

			const drawCyber = () => {
				time += 0.016;
				ctx.clearRect(0, 0, width, height);

				const startX = (width / 2) % spacing;
				const startY = (height / 2) % spacing;
				
				const currentRows = Math.ceil(height / spacing) + 1;

				let col = 0;
				for (let x = startX; x < width; x += spacing) {
					let row = 0;
					for (let y = startY; y < height; y += spacing) {
						const dx = mouse.x - x;
						const dy = mouse.y - y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						const maxDist = 200;

						const dotIdx = col * currentRows + row;

						let targetGlow = 0;
						if (dist < maxDist) {
							targetGlow = 1 - dist / maxDist;
						}

						// Smooth transition logic
						if (dotIdx < cyberGlow.length) {
							if (targetGlow > cyberGlow[dotIdx]) {
								cyberGlow[dotIdx] += (targetGlow - cyberGlow[dotIdx]) * 0.2;
							} else {
								cyberGlow[dotIdx] += (targetGlow - cyberGlow[dotIdx]) * 0.04;
							}
						}

						const factor = dotIdx < cyberGlow.length ? cyberGlow[dotIdx] : 0;

						let radius = baseRadius;
						let opacity = 0.1;

						if (factor > 0.005) {
							radius += factor * 4;
							opacity += factor * 0.8;
						}

						// Subtle ambient pulse
						const pulse = Math.sin(time * 1.2 + x * 0.02 + y * 0.02) * 0.5 + 0.5;
						opacity += pulse * 0.03;

						ctx.beginPath();
						ctx.arc(x, y, radius, 0, Math.PI * 2);
						ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
						ctx.fill();
						
						row++;
					}
					col++;
				}

				animationId = requestAnimationFrame(drawCyber);
			};

			drawCyber();

		} else {
			// Dots variant: dots with mouse interaction and smooth decay
			const spacing = 24;
			const baseRadius = 1;
			
			// Pre-allocate large enough array for high-res screens to avoid reallocation on resize
			const dotGlow = new Float32Array(30000); 

			const drawDots = () => {
				ctx.clearRect(0, 0, width, height);

				const startX = (width / 2) % spacing;
				const startY = (height / 2) % spacing;
				
				// Use currentRows to safely index 1D array
				const currentRows = Math.ceil(height / spacing) + 1;

				let col = 0;
				for (let x = startX; x < width; x += spacing) {
					let row = 0;
					for (let y = startY; y < height; y += spacing) {
						const dx = mouse.x - x;
						const dy = mouse.y - y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						const maxDist = 200;

						const dotIdx = col * currentRows + row;

						let targetGlow = 0;
						if (dist < maxDist) {
							targetGlow = 1 - dist / maxDist;
						}

						// Smooth transition logic (fast ramp up, smooth slow decay)
						if (dotIdx < dotGlow.length) {
							if (targetGlow > dotGlow[dotIdx]) {
								dotGlow[dotIdx] += (targetGlow - dotGlow[dotIdx]) * 0.2;
							} else {
								dotGlow[dotIdx] += (targetGlow - dotGlow[dotIdx]) * 0.04;
							}
						}

						const factor = dotIdx < dotGlow.length ? dotGlow[dotIdx] : 0;

						let radius = baseRadius;
						let opacity = 0.2;
						let r = 59, g = 75, b = 55;

						if (factor > 0.005) {
							// Grow significantly bigger
							radius += factor * 5;
							opacity += factor * 0.8;
							
							// Shift to bright neon green as they get closer
							r = Math.round(59 + (0 - 59) * factor);
							g = Math.round(75 + (255 - 75) * factor);
							b = Math.round(55 + (65 - 55) * factor);
						}

						ctx.beginPath();
						ctx.arc(x, y, radius, 0, Math.PI * 2);
						ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
						ctx.fill();
						
						row++;
					}
					col++;
				}

				animationId = requestAnimationFrame(drawDots);
			};

			drawDots();
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas bind:this={canvas} class="page-background-canvas" aria-hidden="true"></canvas>

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

	.page-background-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: calc(var(--z-background) + 1);
		pointer-events: none;

		@media (max-width: 767px) {
			display: none;
		}
	}
	
	/* Hide static CSS backgrounds when canvas is active to avoid doubling */
	:global(.bg-dots),
	:global(.bg-grid),
	:global(.bg-cyber) {
		background-image: none !important;
	}
</style>
