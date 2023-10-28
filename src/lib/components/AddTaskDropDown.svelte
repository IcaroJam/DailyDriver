<script>
	import { slide } from "svelte/transition";
	import { defaults, tasksList } from "../../stores.js";

	export let newTaskShow;
	export let editTask = false;
	export let taskToEdit = {};

	let taskStart = taskToEdit.rawStart || "";
	let taskEnd = taskToEdit.rawEnd || "";
	let taskText = taskToEdit.description || "";

	// Make it so the minimum taskend is 15 minutes after the taskstart:
	function fifteenMinAfter(time) {
		if (!time)
			return ($defaults.dayStart);

		const hour = parseInt(time.slice(0, 2));
		const min = parseInt(time.slice(3));

		let rethour = hour;
		let retmin = min + 15;

		if (retmin >= 60) {
			retmin %= 60;
			rethour++;
		}
		if (rethour >= 24)
			rethour %= 24;

		return (rethour + ":" + (retmin < 10 ? "0" + retmin : retmin));
	}

	function getTime(hours, minutes) {
		return hours + minutes / 60;
	}

	function getSpan(startTime, endTime) {
		return startTime > endTime ?
			24 - startTime + endTime :
			endTime - startTime;
	}

	function saveTask() {
		const newtask = {
			completed: false,

			description: taskText,

			rawStart: taskStart,
			startHour: parseInt(taskStart.slice(0, 2)),
			startMin: parseInt(taskStart.slice(3)),
			startTime: 0,

			rawEnd: taskEnd,
			endHour: parseInt(taskEnd.slice(0, 2)),
			endMin: parseInt(taskEnd.slice(3)),
			endTime: 0,

			timeSpan: 0,
			timeFromStart: 0,
		}

		newtask.startTime = getTime(newtask.startHour, newtask.startMin);
		newtask.endTime = getTime(newtask.endHour, newtask.endMin);

		newtask.timeSpan = getSpan(newtask.startTime, newtask.endTime);
		newtask.timeFromStart = getSpan($defaults.startTime, newtask.startTime);

		//console.log(newtask);
		
		// If the task is being edited, replace the old version with the new one:
		if (editTask)
			taskToEdit = newtask;
		else
			$tasksList = [...$tasksList, newtask];

		$tasksList.sort(function(a, b) {
			if (a.startHour != b.startHour)
				return a.startHour - b.startHour;
			else
				return a.startMin - b.startMin;
		});

		localStorage.setItem("dailydriver_tasks", JSON.stringify($tasksList));

		// Close the new task dropdown:
		newTaskShow = false;
	}
</script>



<form id={editTask ? "task-edit-window" : "addTaskDD"} on:submit|preventDefault={saveTask} transition:slide={{axis: "y", duration: 500}}>
	<div>
		<!-- These two should not be required in the future (when todos are implemented) -->
		<label for="input-start">From: </label>
		<input required bind:value={taskStart} id="input-start" type="time" step="60" min={$defaults.dayStart} max={$defaults.dayEnd}/>
		<label for="input-end">to:</label>
		<input required bind:value={taskEnd} id="input-end" type="time" step="60" min={fifteenMinAfter(taskStart)} max={$defaults.dayEnd}/>
	</div>
	<label for="task-description">Description:</label>
	<textarea required bind:value={taskText} id="task-description" placeholder="Notem ipsum"/>
	<div>
		<slot></slot>
		<input type="submit" value="Save" id="save">
	</div>
</form>



<style>
	#task-edit-window {
		width: 85%;
		height: 80%;

		border: dashed 3px var(--titleBarColour);
		border-radius: 30px;

		background-color: var(--mainContainerColour);
	}

	form {
		z-index: 1;

		width: 100%;
		min-height: fit-content;

		padding: 20px;
	
		position: absolute;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 5px;
	
		border-bottom: solid 3px var(--titleBarColour);
		border-radius: 30px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	
		background-color: var(--mainContainerColour);

		color: var(--titleBarColour);
	}

	form > div {
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}

	form > label {
		width: 100%;
	}

	form :global(input), form textarea {
		width: 50%;
		height: 50px;

		padding: 10px;
	
		border: solid 3px var(--titleBarColour);
		border-radius: 15px;
	
		color: var(--titleBarColour);
		background-color: var(--subdivColour1);

		cursor: pointer;
	}
	
	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--titleBarColour);
		opacity: 1; /* Firefox */
	}
	
	form textarea {
		width: 100%;
		height: 100px;

		flex-grow: 1;

		resize: none;
	}
	
	#save {
		border-color: var(--titleBarColour);
		border-style: solid;

		transition: all .2s ease;
	}
	
	#save:hover {
		border-color: var(--subdivColour1);
	
		color: var(--subdivColour1);
		background-color: var(--titleBarColour);
	}
</style>
