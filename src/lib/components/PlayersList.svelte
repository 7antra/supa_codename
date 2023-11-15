<script lang="ts">
	import { game } from '$lib/store';
	import { flip } from 'svelte/animate';

	$: players = $game?.players?.sort(({ team }) => (team === 'red' ? 1 : -1)) ?? [];
</script>

<div class="list">
	{#each players as { name, team, spy } (name)}
		<div animate:flip class="player {team}">
			<p>
				{name}
				{#if spy}
					<span> 🕵️</span>
				{/if}
			</p>
		</div>
	{/each}
</div>

<style>
	.list {
		display: grid;
		gap: 0.2rem;
		align-items: center;
	}

	.player {
		padding: 0.2rem;
	}

	.player.red {
		background-color: var(--red);
	}

	.player.blue {
		background-color: var(--blue);
	}
</style>
