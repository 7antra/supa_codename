<script lang="ts">
	import { goto } from '$app/navigation';

	const createNewGame = async () => {
		const promise = await fetch('/api/game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await promise.json();

		await goto(`/${data.word_id}`);
	};
</script>

<div>
	<button on:click={createNewGame}>New Game</button>
	<button>Join Game</button>
</div>

<style>
	div {
		display: grid;
		gap: 1rem;
	}
</style>
