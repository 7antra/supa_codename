<script lang="ts">
	import '$lib/styles/global.css';
</script>

<main>
	<slot><!-- optional fallback --></slot>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		padding: 1rem;
		display: grid;
	}
</style>
