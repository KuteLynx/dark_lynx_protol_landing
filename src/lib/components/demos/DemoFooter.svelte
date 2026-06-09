<script lang="ts">
	let { brandName = 'Demo' } = $props();
</script>

<footer class="demo-footer">
	<p class="demo-footer__brand">{brandName}</p>
	<p>
		Demo creada por <a href="/servicios/landing-pages">Dark Lynx Protocol</a>
		— <a href="/contacto">Contáctanos</a>
	</p>
</footer>
