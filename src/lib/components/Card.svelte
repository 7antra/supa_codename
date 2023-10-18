<script lang="ts">
	export let word: string;
	export let color: string;
	export let revealed: boolean;
</script>

<div style:background={revealed ? color : 'lightgrey'} on:click>
	<p>{word}</p>
</div>

<style>
	div {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		border: 2px solid black;
		border-radius: 3px;

		&:hover {
			cursor: pointer;
		}
	}

	p {
		font-family: monospace;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}
</style>
