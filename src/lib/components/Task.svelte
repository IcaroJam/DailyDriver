<script>
	export let props;
</script>


{#if props !== undefined}
	<div class="task">
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
		top: 50px;
		right: 0;
	
		border-radius: 30px 0 0 30px;
	
		color: var(--titleBarColour);
		background-color: var(--sideBarElementColour);
	}
</style>
