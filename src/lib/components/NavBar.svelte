<script>
	
</script>



<nav>
	<div class="roundIcons" onclick="localStorage.removeItem('currentTasks'); location.reload()">RESET TASKS</div>
	<div id="titleBar"> <!-- Some kind of title(? Maybe the title is also the configs button. -->
		Cute Notes uwu
	</div>
	<div class="roundIcons" onclick="newTaskPop()">B</div>
</nav>



<style>
	nav {
		width: 100%;
		height: 5vh;
		padding: 5px 10px;
	
		z-index: 7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	
		background-color: var(--mainContainerColour, slategrey);
	
		position: fixed;
	}

	.roundIcons {
		min-width: 5vh;
		min-height: 5vh;
	
		display: flex;
		align-items: center;
		justify-content: center;
	
		border-radius: 100%;
	
		background-color: var(--subdivColour2, lightsteelblue);

		text-align: center;
	}

	#titleBar {
		width: 75%;
		height: 100%;
	
		display: flex;
		align-items: center;
		justify-content: center;
	
		border-radius: 50px;
		background-color: var(--titleBarColour, lightsteelblue);
	
		font-size: 2em;
		color: var(--titleTextColour, slategrey);
	}
</style>
