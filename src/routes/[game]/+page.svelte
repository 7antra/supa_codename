<script lang="ts">
	import { supabase } from '$lib/DB';
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	export let data;

	const store = writable();
	let mounted = false;
	let spy = false;

	supabase
		.channel('cn_word')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'cn_games',
				filter: `word_id=eq.${data.game.word_id}`
			},
			(payload) => {
				const update = payload?.new;
				if (update && store) {
					store.set(update);
				}
			}
		)
		.subscribe();

	const revealCard = async (i: number) => {
		const next = [...$store?.board];
		const card = next[i];
		card.revealed = true;

		const { error } = await supabase
			.from('cn_games')
			.update({ board: next })
			.eq('word_id', data.game.word_id);
	};

	onMount(() => {
		mounted = true;
		store.set(data.game);
	});
</script>

<div class="board">
	{#if $store && mounted}
		{#each $store.board as { word, color, revealed }, i}
			<div
				transition:fly|global={{ delay: 50 * i, y: Math.random() * 500, x: Math.random() * -500 }}
			>
				<Card {word} {color} revealed={spy || revealed} on:click={() => revealCard(i)} />
			</div>
		{/each}
	{/if}
</div>
<button on:click={() => (spy = !spy)}>🕵️</button>

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
</style>
