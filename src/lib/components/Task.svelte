<script>
	export let props;
</script>


{#if props !== undefined}
	<!-- There must be a better, less fucking ugly way of doing this... -->
	<div class="task" style={`height: ${110 * props.timeSpan}px; top: calc(var(--navHeight) + ${110 * props.timeSpan}px)`}>
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
