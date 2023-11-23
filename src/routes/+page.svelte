<script>
    import SideBar from "$lib/components/SideBar.svelte";
	import TaskBar from "$lib/components/TaskBar.svelte";

	import { defaults } from "../stores";

	// Create a list of workable hours and update it everytime the start and end times are changed in the config:
	$: getDaySpan($defaults.startTime, $defaults.endTime);

	function getDaySpan(start, end) {
		$defaults.timeSpan = [start];
		for (let i = start + 1; i !== end; ) {
			$defaults.timeSpan.push(i);

			i++;
			i %= 24;
		}
	}
</script>



<div class="scrollable-container">
	<div>
		<SideBar />
		<TaskBar />
	</div>
	<footer>
		<small>
			DailyDriver alpha-0.0.3
		</small>
	</footer>
</div>



<style>
	.scrollable-container {
		width: 100%;
		height: calc(100% - var(--navHeight));

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
		color: var(--bgColour);
	}
</style>
