<script lang="ts">
	import HUD from '$lib/components/HUD.svelte';
	import { supabase } from '$lib/DB';
	import Card from '$lib/components/Card.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { PUBLIC_DB_TENANT } from '$env/static/public';
	import { game, players, type Game } from '$lib/store';
	import Modal from '$lib/components/Modal.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';

	export let data;

	let mounted = false;
	let spy = false;
	let isSpy = false;
	let openModal = false;
	let name = '';

	//actions
	const revealCard = async (i: number) => {
		const next = [...$game?.board];
		const card = next[i];
		let start_switch = !!($game.start === 'red');

		if (card.revealed) return;
		if ($game.start !== card.color) {
			start_switch = !start_switch;
		}
		card.revealed = true;

		const { error } = await supabase
			.from(PUBLIC_DB_TENANT)
			.update({
				board: next,
				start: start_switch ? 'red' : 'blue'
			})
			.eq('word_id', data.game.word_id);

		if (error) console.log(error);
	};

	const addPlayer = async (name: string) => {
		isSpy = $players.filter(({ spy }) => spy).length < 2;
		const redTeam = $players.filter(({ team }) => team === 'red')?.length;
		const blueTeam = $players.filter(({ team }) => team === 'blue')?.length;

		const { error } = await supabase
			.from(PUBLIC_DB_TENANT)
			.update({
				players: [
					...($game?.players ?? []),
					{
						name,
						team: blueTeam < redTeam ? 'blue' : 'red',
						spy: isSpy
					}
				]
			})
			.eq('word_id', data.game.word_id);

		if (error) console.log(error);
	};

	const removePlayer = async (name: string) => {
		const { error } = await supabase
			.from(PUBLIC_DB_TENANT)
			.update({
				players: $game?.players.filter((player) => player.name !== name)
			})
			.eq('word_id', data.game.word_id);

		if (error) console.log(error);
	};

	onMount(() => {
		mounted = true;
		game.set(data.game);

		supabase
			.channel('cn_word')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: PUBLIC_DB_TENANT,
					filter: `word_id=eq.${data.game.word_id}`
				},
				(payload) => {
					const update = payload?.new as Game;
					if (update && game) {
						game.set(update);
					}
				}
			)
			.subscribe();

		if (!name) {
			openModal = true;
		}
	});

	onDestroy(() => {
		removePlayer(name);
	});
</script>

<div class="board">
	{#if $game && mounted}
		{#each $game.board as { word, color, revealed }, i (word)}
			<div
				transition:fly|global={{ delay: 50 * i, y: Math.random() * 500, x: Math.random() * -500 }}
			>
				<Card {word} {color} revealed={spy || revealed} on:click={() => revealCard(i)} />
			</div>
		{/each}
	{/if}
</div>

{#if openModal}
	<Modal>
		<form
			on:submit={() => {
				addPlayer(name);
				openModal = false;
			}}
		>
			<PlayersList />
			<input type="text" placeholder="name" bind:value={name} />
		</form>
	</Modal>
{/if}

<HUD {isSpy} bind:spy />

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 1rem;
		height: 85vh;
	}

	button {
		margin-top: 1rem;
		font-size: 1rem;
		height: 5vh;
	}

	form {
		display: grid;
		gap: 1rem;
	}
</style>
