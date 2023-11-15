<script lang="ts">
	import { score } from '$lib/store';

	export let spy: boolean = false;
	export let isSpy: boolean = false;
</script>

<div class="hud">
	<p>Red : {$score.red}</p>
	<p>Blue : {$score.blue}</p>
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
