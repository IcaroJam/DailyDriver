<script>
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";

	export let props;
	export let i;

	let slideIn = false;
	let taskHeight = 110 * props.timeSpan;
	let taskTop = 110 * props.timeFromStart + 5;

	onMount(() => {
		slideIn = true;
		//console.log("Task ", i, ": ", props);
	});

	function completeTask() {
		props.completed = !props.completed;
	}
</script>



{#if props !== undefined && slideIn}
	<!-- There must be a better, less fucking ugly way of doing this... -->
	<div class="task" class:task-alt-bc={i % 2} class:completed={props.completed}
	style={`height: ${taskHeight}px; top: ${taskTop}px`}
	transition:slide={{axis: "x", duration: 500}}
	role="button" tabindex="0" on:click={completeTask} on:keypress={completeTask}>
		<span>{props.description}</span>
	</div>
{/if}



<style>
	.task {
		width: 85%;
		padding: 5px 15px;
	
		display: flex;
		align-items: center;
	
		position: absolute;
		right: 0;
	
		border-radius: 30px 0 0 30px;
	
		color: var(--titleBarColour);
		background-color: var(--sideBarElementColour);

		cursor: pointer;

		transition: all .5s ease;
	}

	.task:hover {
		width: 87.5%;

		transition: width .1s ease-out;
	}

	.task > span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.task-alt-bc {
		background-color: var(--sideBarBackColour);
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
</style>
