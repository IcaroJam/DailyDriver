<script>
	import { defaults, tasksList } from "../../stores.js";

	export let configShow = false;

	let dayStart = $defaults.dayStart;
	let dayEnd = $defaults.dayEnd;

	function oneMoreHour(givenTime) {
		const temp = parseInt(givenTime.slice(0, 2) + 1);

		return temp >= 24 ? temp % 24 + ":00" : temp + ":00";
	}

	function checkOOR(task, nc) {
		return task.timeSpan > nc.daySpan
				|| (task.startTime < nc.startTime && task.startTime > nc.endTime)
				|| (task.endTime > nc.endTime && task.endTime < nc.startTime);
	}

	function settingsCheck(newConfig) {
		// Check if any tasks would fall out of the new time span:
		const outOfRangeTasks = $tasksList.filter((task) => checkOOR(task, newConfig));
		console.log("These fall out:", outOfRangeTasks);
	
		return true;
	}

	function saveSettings() {
		const newConfig = {
			startTime: parseInt(dayStart.slice(0, 2)),
			endTime: parseInt(dayEnd.slice(0, 2)),
			dayStart: dayStart,
			dayEnd: dayEnd,
			daySpan: 0,
		}
		newConfig.daySpan = newConfig.startTime > newConfig.endTime ? 24 + newConfig.dayEnd - newConfig.dayStart : newConfig.dayEnd - newConfig.dayStart;
	
		if (settingsCheck(newConfig)) {
			$defaults = newConfig;

			//console.log($defaults);
			configShow = false;
		}
	}
</script>



<div class="blurred-window" on:submit|preventDefault={saveSettings}>
	<form class="config-window">
		<div class="config-horizontal">
			<button id="close-config-btn" title="Close settings" on:click={() => {configShow = false;}}>X</button>
			<span id="main-config-label">DailyDriver Settings!</span>
		</div>
		<div class="deco-div"></div>
		<div class="config-horizontal">
			<label for="startTimeInput">Day start:</label>
			<input required bind:value={dayStart} id="startTimeInput" type="time" step="3600">
		</div>
		<div class="config-horizontal">
			<label for="endTimeInput">Day end:</label>
			<input required bind:value={dayEnd} id="endTimeInput" type="time" min={oneMoreHour(dayStart)} step="3600">
		</div>
		<input type="submit" value="Save" id="save">
	</form>
</div>



<style>
	.config-window {
		width: 80%;
		height: 85%;

		padding: 20px;

		display: flex;
		flex-direction: column;
		gap: 5px;

		border: dashed 3px var(--titleBarColour);
		border-radius: 30px;

		background-color: var(--sideBarBackColour);

		color: var(--titleBarColour);
	}

	.config-horizontal {
		width: 100%;
		height: 40px;

		display: flex;
		align-items: center;
		gap: 7px;
	}

	#close-config-btn {
		width: 40px;
		height: 40px;

		border: 3px solid var(--titleBarColour);
		border-radius: 5px;

		color: inherit;
		background-color: var(--sideBarElementColour);
	}

	#main-config-label {
		display: flex;
		align-items: center;

		font-size: 1.5em;
	}

	.deco-div {
		width: 100%;
		height: 3px;

		border-radius: 50px;
		background-color: var(--titleBarColour);
	}

	.config-horizontal label {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.config-horizontal input {
		height: 80%;

		flex-grow: 1;
	}
</style>
