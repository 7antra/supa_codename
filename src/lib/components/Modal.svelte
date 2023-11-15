<script lang="ts">
	import { fly } from 'svelte/transition';

	const clickOutside = (node: HTMLElement) => {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node)) {
				dispatchEvent(new CustomEvent('close'));
			}
		};

		document.addEventListener('click', handleClick);

		return {
			destroy() {
				document.removeEventListener('click', handleClick);
			}
		};
	};
</script>

<div class="container">
	<div class="modal" transition:fly={{ y: -100 }} use:clickOutside>
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
