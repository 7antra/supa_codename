<script lang="ts">
	import { score, players } from '$lib/store';

	export let spy: boolean = false;
	export let isSpy: boolean = false;
</script>

<div class="hud">
	<p>Red : {$score.red}</p>
	<p>Blue : {$score.blue}</p>
	<p>Players ({$players?.length ?? 0})</p>
	{#if isSpy}
		<button on:click={() => (spy = !spy)}>🕵️</button>
	{/if}
</div>

<style>
	.hud {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		align-items: center;
		gap: 1rem;
	}
</style>
