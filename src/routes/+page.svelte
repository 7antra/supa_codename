<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$lib/components/Modal.svelte';

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

	let openModal = false;
	let value = '';

	$: console.log('page : ', $page);
</script>

<div>
	<button on:click={createNewGame}>New Game</button>
	<button on:click={() => (openModal = !openModal)}>Join Game</button>
</div>

{#if openModal}
	<Modal on:close={() => (openModal = !openModal)}>
		<form>
			<input type="text" placeholder="game id" bind:value />
			<button on:click={() => goto(`/${value}`)}>go</button>
		</form>
	</Modal>
{/if}

<style>
	div {
		display: grid;
		gap: 1rem;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	form input,
	button {
		padding: 0.5rem;
	}
</style>
