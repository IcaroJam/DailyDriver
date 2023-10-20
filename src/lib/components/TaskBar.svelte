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
		
		position: relative;
		top: 0;
	}
	
	.taskElement {
		width: 100%;
		height: 100px;

		z-index: -1;

		margin-top: 10px;

		position: relative;
		right: 5%;
		
		border-radius: 0 30px 30px 0;
	}

	.colour1 {
		background-color: var(--subdivColour2);
	}

	.colour2 {
		background-color: var(--subdivColour3);
	}
</style>
