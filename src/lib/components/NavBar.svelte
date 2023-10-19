<script>
	
</script>



<nav>
	<div class="roundIcons" onclick="//localStorage.removeItem('currentTasks'); location.reload()">RESET TASKS</div>
	<div id="titleBar"> <!-- Some kind of title(? Maybe the title is also the configs button. -->
		Cute Notes uwu
	</div>
	<div class="roundIcons" onclick="//newTaskPop()">B</div>
</nav>



<style>
	nav, nav > div {
		display: flex;
		align-items: center;
	}

	nav {
		--navHeight: 60px;
		--navIconSize: 50px;

		width: 100%;
		height: var(--navHeight);
		padding: calc((var(--navHeight) - var(--navIconSize)) / 2) 10px;
	
		z-index: 7;
		justify-content: space-between;
	
		background-color: var(--mainContainerColour, slategrey);
	
		position: fixed;
	}

	nav > div {
		justify-content: center;

		border-radius: 50px;

		cursor: pointer;
	}

	.roundIcons {
		width: var(--navIconSize);
		height: var(--navIconSize);
	
		background-color: var(--subdivColour2, lightsteelblue);

		text-align: center;
	}

	#titleBar {
		width: 75%;
		height: 100%;
	
		background-color: var(--titleBarColour, lightsteelblue);
	
		font-size: 2em;
		color: var(--titleTextColour, slategrey);
	}
</style>
