<script>
	import { onMount } from "svelte";
	import { slide, fly } from "svelte/transition";
    import AddTaskDropDown from "./AddTaskDropDown.svelte";
	import { getSpan } from "./AddTaskDropDown.svelte";
	import { defaults, tasksList, selectedTasks } from "../../stores";

	export let props;
	export let i;

	let slideIn = false;
	let taskHeight;
	let taskTop;

	let selected = false;
	let editing = false;
	let delconf = false;

	$: props.timeFromStart = getSpan($defaults.startTime, props.startTime);
	$: taskHeight = 110 * props.timeSpan;
	$: taskTop = 110 * props.timeFromStart + 5;

	$: selected = $selectedTasks.indexOf(i) !== -1;

	onMount(() => {
		slideIn = true;
		//console.log("Task ", i, ": ", props);
	});

	function toggleSelected() {
		if (!props.completed) {
			selected ? $selectedTasks.splice($selectedTasks.indexOf(i), 1) : $selectedTasks.push(i);
			$selectedTasks = $selectedTasks;
		}
	}

	function editTask() {
		editing = !editing;
		$selectedTasks = [i];
	}

	function completeTask() {
		toggleSelected();
		props.completed = !props.completed;
		localStorage.setItem("dailydriver_tasks", JSON.stringify($tasksList));
	}

	function deleteTask() {
		toggleSelected();
		const tempList = [...$tasksList];
		tempList.splice(i, 1);
		localStorage.setItem("dailydriver_tasks", JSON.stringify(tempList));
		editing = false;
		$tasksList = tempList;
	}
</script>



{#if props !== undefined && slideIn}
	<!-- There must be a better, less fucking ugly way of doing this... -->
	<div class="task" class:task-alt-bc={i % 2} class:completed={props.completed}
	style={`height: ${taskHeight}px; top: ${taskTop}px`}
	transition:slide={{axis: "x", duration: 500}}
	role="button" tabindex="0"
	on:click={toggleSelected}
	on:keypress={toggleSelected}>
		{#if selected || props.completed}
			<!-- Holy shit ok, apparently preventDefault keeps the onclick from triggering right after the ontouchstart. The stopImmediatePropagation takes care of preventing the ontouchstart from the parent div of also triggering.
			There MUST be a better way of doing this so it works fine both for web and mobile cause boy oh boy is having this many events and variables and wtf not confusing as all hell -->
			<svg
			role="button" tabindex="0" on:click|stopImmediatePropagation={completeTask} on:keypress|stopImmediatePropagation={completeTask}
			in:slide={{axis: "x", duration: 100}}
			out:slide={{axis: "x", duration: 400}}
			viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				{#if props.completed}
					<title>Mark task as not completed :(</title>
					<path d="M8 12.3333L10.4615 15L16 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				{:else}
					<title>Mark task as completed :D</title>
					<path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				{/if}
			</svg>
		{/if}
		<span>{props.description}</span>
		{#if selected && !props.completed}
			<svg
			role="button" tabindex="0" on:click|stopImmediatePropagation={editTask} on:keypress|stopImmediatePropagation={editTask}
			in:slide={{axis: "x", duration: 100}}
			out:slide={{axis: "x", duration: 400}}
			viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<title>Edit task info</title>
				<path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		{/if}
	</div>
{/if}

{#if editing}
	<div class="blurred-window">
		<AddTaskDropDown bind:newTaskShow={editing} editTask={true} bind:taskToEdit={props} >
			<input class="cancel-btn" type="reset" value="Cancel" on:click={editTask}>
		</AddTaskDropDown>
		<div class="delete-container" transition:fly={{y: 100, duration: 500}}>
			{#if delconf}
				<button class="fuck-go-back" on:click={() => {delconf = false;}}>No</button>
				Sure?
				<button class="delete-btn" style="width: unset;" on:click={deleteTask}>Yes</button>
			{:else}
				<button class="delete-btn" on:click={() => {delconf = true;}}>!! Delete task !!</button>
			{/if}
		</div>
	</div>
{/if}



<style>
	.task {
		width: 85%;
	
		display: flex;
		align-items: center;
	
		position: absolute;
		right: 0;
	
		border-radius: 30px 0 0 30px;
	
		color: var(--textColour);
		background-color: var(--taskBgColour);

		overflow: hidden;

		cursor: pointer;

		transition: all .5s ease;
	}

	.task:hover {
		width: 87.5%;

		transition: width .1s ease-out;
	}

	.task > svg {
		width: 30px;
		height: 110%;

		flex-shrink: 0;

		border: dotted 3px var(--iconColour);
		border-top: none;
		border-bottom: none;

		cursor: pointer;
	}

	.task > svg * {
		stroke: var(--iconColour);
	}

	.task > span {
		flex-grow: 1;

		margin: 10px 15px;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.task-alt-bc {
		background-color: var(--taskAltBgColour);
	}

	.completed {
		width: 80%;

		opacity: 0.6;

		text-decoration: line-through;
		text-decoration-thickness: 2px;

		transition: all .5s ease;
	}

	.completed:hover {
		width: 79%;

		transition: all .5s ease;
	}

	.cancel-btn {
		color: var(--textAltColour);
		background-color: var(--titleBarColour);
	}

	.delete-container {
		width: 50%;

		position: absolute;
		bottom: 2%;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5px;

		border-radius: 15px;
		background-color: var(--bgColour);
		color: var(--textColour);
		font-weight: bold;
	}

	.delete-container > button {
		padding: 10px;

		border: solid 3px var(--bgColour);
		border-radius: 15px;

		text-align: center;
		font-weight: bolder;

		cursor: pointer;
	}

	.delete-container .fuck-go-back {
		color: var(--textColour);
		background-color: var(--bgColour);
		border: solid 3px var(--titleBarColour);
	}

	.delete-btn {
		width: 100%;

		color: var(--textAltColour);
		background-color: var(--titleBarColour);
	}
</style>
