<script>
    import SideBar from "$lib/components/SideBar.svelte";
	import TaskBar from "$lib/components/TaskBar.svelte";

	import { defaults } from "../stores";

	// Add useful stuff to the config:
	$defaults.timeSpan = [...Array($defaults.endTime).keys()].filter((num) => num >= $defaults.startTime);
</script>



<div class="scrollable-container">
	<div>
		<SideBar />
		<TaskBar />
	</div>
	<footer>
		<small>
			DailyDriver indev-0.0.0.1
		</small>
	</footer>
</div>



<style>
	.scrollable-container {
		width: 100%;
		height: calc(100% - var(--navHeight));

		position: relative;
		top: var(--navHeight);

		overflow-y: auto;
	}

	.scrollable-container > div {
		width: 100%;

		padding-bottom: 10px;

		display: flex;
	}

	footer {
		width: 100%;
		height: 3.5em;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	footer > small {
		padding: 0.3em 1.2em;

		border-radius: 30px;

		background-color: var(--titleBarColour);
		color: var(--mainContainerColour);
	}
</style>
