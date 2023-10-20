<script>
    import {defaults} from "../../stores";
</script>



<div id="taskBar">
	{#each $defaults.timeSpan as hour}
		<div class={hour % 2 ? "taskElement colour1" : "taskElement colour2"}></div>
	{/each}
</div>



<style>
	#taskBar {
		width: 100%;
		
		position: absolute;
		top: var(--navHeight);

		display: flex;
		flex-direction: column;
	}
	
	.taskElement {
		width: 95%;
		height: 100px;

		margin-top: 10px;
		
		border-radius: 0 30px 30px 0;
	}

	.colour1 {
		background-color: var(--subdivColour2);
	}

	.colour2 {
		background-color: var(--subdivColour3);
	}
</style>
