<script>
	import RestoreConfigIcon from "./RestoreConfigIcon.svelte";
	import { defaults, tasksList } from "../../stores.js";
	import { getSpan } from "./AddTaskDropDown.svelte";

	export let configShow = false;

	let dayStart = $defaults.dayStart;
	let dayEnd = $defaults.dayEnd;
	let titleTxt = $defaults.titleTxt;

	const invalidity = {
		dayStart: false,
		dayEnd: false,
		titleTxt: false,
	};
	let warningMsg = "";

	function checkOOR(task, nc) {
		// If the new end position of the task is greater than or equal to the total height of the task container, it overflows.
		return (getSpan(nc.startTime, task.startTime) + task.timeSpan >= nc.daySpan);
	}

	function settingsCheck(newConfig) {
		warningMsg = "";

		// Check if any tasks would fall out of the new time span:
		const outOfRangeTasks = $tasksList.filter((task) => checkOOR(task, newConfig));
		if (outOfRangeTasks.length > 0) {
			warningMsg += outOfRangeTasks.length === 1 ?
				"A current task doesn't fit the new start and end times!\n" :
				"Some current tasks don't fit the new start and end times!\n";
			invalidity.dayStart = true;
			invalidity.dayEnd = true;
		}
	
		return warningMsg.length > 0;
	}

	function saveSettings() {
		const newConfig = {
			startTime: parseInt(dayStart.slice(0, 2)),
			endTime: parseInt(dayEnd.slice(0, 2)),
			dayStart: dayStart,
			dayEnd: dayEnd,
			daySpan: 0,
			titleTxt: titleTxt,
		}
		newConfig.daySpan = newConfig.startTime >= newConfig.endTime ? 24 + newConfig.endTime - newConfig.startTime : newConfig.endTime - newConfig.startTime;
	
		if (!settingsCheck(newConfig)) {
			$defaults = newConfig;

			localStorage.setItem("dailydriver_config", JSON.stringify($defaults));

			//console.log($defaults);
			configShow = false;
		} else {

		}
	}
</script>



<div class="blurred-window">
	<form class="config-window" on:submit|preventDefault={saveSettings}>
		<div class="config-horizontal">
			<button type="button" id="close-config-btn" title="Close settings" on:click|preventDefault={() => {configShow = false;}}>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Edit / Add_Plus_Circle">
					<path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
				</svg>
			</button>
			<span id="main-config-label">DailyDriver Settings!</span>
		</div>

		<div class="deco-div"></div>

		<div class="config-horizontal">
			<label for="startTimeInput">Day start:</label>
			<input required bind:value={dayStart} id="startTimeInput" type="time" step="3600" class:invalid={invalidity.dayStart}>
			<RestoreConfigIcon bind:oldVal={$defaults.dayStart} bind:newVal={dayStart} />
		</div>
		<div class="config-horizontal">
			<label for="endTimeInput">Day end:</label>
			<input required bind:value={dayEnd} id="endTimeInput" type="time" step="3600" class:invalid={invalidity.dayEnd}>
			<RestoreConfigIcon bind:oldVal={$defaults.dayEnd} bind:newVal={dayEnd} />
		</div>

		<div class="config-horizontal">
			<label for="titleInput">Title bar text:</label>
			<input required bind:value={titleTxt} id="titleInput" type="text" maxlength="14" autocomplete="off" class:invalid={invalidity.titleTxt}>
			<RestoreConfigIcon bind:oldVal={$defaults.titleTxt} bind:newVal={titleTxt} />
		</div>

		<span>{warningMsg}</span>
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
		height: 50px;

		display: flex;
		align-items: center;
		gap: 7px;
	}

	#close-config-btn {
		width: 50px;
		height: 50px;

		padding: 0;

		border: none;
		border-radius: 50px;

		color: inherit;
		background-color: transparent;

		cursor: pointer;

		transform: rotate(45deg);
		
		transition: transform .4s ease;
	}

	#close-config-btn:hover {
		transform: rotate(45deg) scale(0.85);
	}

	#close-config-btn * {
		width: 40px;
		height: 40px;

		stroke: var(--titleBarColour);
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

	input {
		height: 50px;

		padding: 5px;

		border: none;
		border-radius: 5px;

		background-color: var(--sideBarElementColour);

		cursor: pointer;
	}

	#save {
		border-bottom: solid 3px var(--sideBarElementColour);

		transition: background .2s ease;
	}

	#save:hover {
		background-color: transparent;
	}

	.config-horizontal label {
		max-width: 20%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.config-horizontal input {
		height: 80%;

		flex-grow: 1;
	}

	.invalid {
		background-color: var(--warningColour, brown);
	}
</style>
