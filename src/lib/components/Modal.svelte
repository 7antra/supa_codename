<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
</script>

<div class="container">
	<div class="modal" transition:fly={{ y: -100 }}>
		<slot><!-- optional fallback --></slot>
	</div>
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.container .modal {
		width: 30%;
		background-color: var(--grey);
		border: 5px solid var(--black);
		border-radius: 5px;
		padding: 1rem;
		display: flex;
		justify-content: center;
	}
</style>
