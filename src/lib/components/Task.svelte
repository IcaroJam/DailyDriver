<script>
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";

	export let props;

	let slideIn = false;

	onMount(() => {
		slideIn = true;
	});
</script>



{#if props !== undefined && slideIn}
	<!-- There must be a better, less fucking ugly way of doing this... -->
	<div class="task" style={`height: ${110 * props.timeSpan}px; top: ${110 * props.timeFromStart}px`} transition:slide={{axis: "x", duration: 500}}>
		{props.description}
	</div>
{/if}



<style>
	.task {
		width: 85%;
		padding: 5px 15px;
	
		display: flex;
		flex-direction: column;
		justify-content: center;
	
		position: absolute;
		right: 0;
	
		border-radius: 30px 0 0 30px;
	
		color: var(--titleBarColour);
		background-color: var(--sideBarElementColour);
	}
</style>
