<script>
	
</script>



<nav>
	<div class="roundIcons" onclick="//localStorage.removeItem('currentTasks'); location.reload()">RESET TASKS</div>
	<div id="titleBar"> <!-- Some kind of title(? Maybe the title is also the configs button. -->
		Cute Notes uwu
	</div>
	<div class="roundIcons" onclick="//newTaskPop()">
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
			<path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
		</svg>
	</div>
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
	}

	.roundIcons * {
		width: inherit;
		height: inherit;

		stroke: var(--titleBarColour, lightsteelblue);
	}

	#titleBar {
		width: 75%;
		height: 100%;

		padding: 0 20px;

		justify-content: space-between;

		background-color: var(--titleBarColour, lightsteelblue);
	
		font-size: 2em;
		color: var(--titleTextColour, slategrey);

		transition: font-size .4s ease;
	}

	#titleBar::after, #titleBar::before {
		content: "\2304";

		color: transparent;

		transition: color .1s ease, transform .4s ease-out;
	}

	#titleBar::after {
		transform: rotate(90deg);
	}

	#titleBar::before {
		transform: rotate(-90deg);
	}

	#titleBar:hover {
		font-size: 1.8em;
	}

	#titleBar:hover::after, #titleBar:hover::before {
		color: inherit;

		transform: unset;
	}
</style>
