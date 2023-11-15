<script lang="ts">
	import { game } from '$lib/store';
	import '$lib/styles/global.css';

	$: start = $game?.start ?? '';
</script>

<main class={start}>
	<slot><!-- optional fallback --></slot>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		padding: 1rem;
		display: grid;
		border: 5px solid;

		&.red {
			border-color: var(--red);
		}

		&.blue {
			border-color: var(--blue);
		}
	}
</style>
