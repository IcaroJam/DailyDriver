<script>
    import {defaults, tasksList} from "../../stores";
	import Task from "$lib/components/Task.svelte";
</script>



<div id="taskBar">
	<!-- Decorative timespan dividers: -->
	{#each $defaults.timeSpan as hour}
		<div class={hour % 2 ? "deco colour1" : "deco colour2"}></div>
	{/each}

	<!-- The tasks themselves: -->
	{#each $tasksList as taskinfo}
		<Task {...taskinfo} />
	{/each}
</div>



<style>
	#taskBar {
		width: 100%;
		
		position: relative;
		top: 0;
	}
	
	.deco {
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
