<script>
	import { slide } from "svelte/transition";
	import { defaults, tasksList } from "../../stores.js";

	let taskStart = "", taskEnd = "", taskText = "";

	function saveTask() {
		const newtask = {
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

		newtask.startTime = newtask.startHour + newtask.startMin / 60;
		newtask.endTime = newtask.endHour + newtask.endMin / 60;

		newtask.timeSpan = newtask.startTime > newtask.endTime ?
			24 - newtask.startTime + newtask.endTime :
			newtask.endTime - newtask.startTime;
		newtask.timeFromStart = $defaults.startTime > newtask.startTime ?
			24 - $defaults.startTime + newtask.startTime :
			newtask.startTime - $defaults.startTime;

		console.log(newtask);

		$tasksList = [...$tasksList, newtask];
		$tasksList.sort(function(a, b) {
			if (a.startHour != b.startHour)
				return a.startHour - b.startHour;
			else
				return a.startMin - b.startMin;
		});

		localStorage.setItem("dailydriver_tasks", JSON.stringify($tasksList));
	}
</script>



<form id="addTaskDD" on:submit|preventDefault={() => ""} transition:slide={{axis: "y", duration: 500}}>
	<div>
		<!-- These two should not be required in the future (when todos are implemented) -->
		<label for="input-start">From: </label>
		<input required bind:value={taskStart} id="input-start" type="time" step="60" min={$defaults.startTime} max={$defaults.endTime}/>
		<label for="input-end">to:</label>
		<input required bind:value={taskEnd} id="input-end" type="time" step="60" min={$defaults.startTime} max={$defaults.endTime}/>
	</div>
	<label for="task-description">Description:</label>
	<textarea required bind:value={taskText} id="task-description" placeholder="Notem ipsum"/>
	<input type="submit" value="Save" id="save" on:click={saveTask}>
</form>



<style>
	#addTaskDD {
		z-index: 1;

		width: 100%;
		min-height: min-content;

		padding: 20px;
	
		position: absolute;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
	
		border-bottom: solid 3px var(--titleBarColour);
		border-radius: 30px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	
		background-color: var(--mainContainerColour);

		color: var(--titleBarColour);
	}

	#addTaskDD > div {
		width: 100%;

		display: flex;
		align-items: center;
		gap: 5px;
	}

	#addTaskDD > label {
		width: 100%;
	}

	#addTaskDD input, #addTaskDD textarea {
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
	
	#addTaskDD textarea {
		width: 100%;
		height: 100px;

		border-bottom-right-radius: 0;
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
