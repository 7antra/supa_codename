<script lang="ts">
	export let word: string;
	export let color: string;
	export let revealed: boolean;
</script>

<div class={revealed ? color : 'grey'} on:click>
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

		&.blue {
			background-color: #3d95c1;
		}

		&.red {
			background-color: #cc4141;
		}

		&.black {
			background-color: #2d2828;
		}

		&.white {
			background-color: #bfc69b;
		}

		&.grey {
			background-color: #d5d6cd;
		}
	}

	p {
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}
</style>
