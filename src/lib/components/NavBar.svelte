<script>
	
</script>



<nav>
	<div class="roundIcons" onclick="//localStorage.removeItem('currentTasks'); location.reload()">
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="Arrow / Arrows_Reload_01">
			<path id="Vector" d="M10 16H5V21M14 8H19V3M4.58301 9.0034C5.14369 7.61566 6.08244 6.41304 7.29255 5.53223C8.50266 4.65141 9.93686 4.12752 11.4298 4.02051C12.9227 3.9135 14.4147 4.2274 15.7381 4.92661C17.0615 5.62582 18.1612 6.68254 18.9141 7.97612M19.4176 14.9971C18.8569 16.3848 17.9181 17.5874 16.708 18.4682C15.4979 19.3491 14.0652 19.8723 12.5723 19.9793C11.0794 20.0863 9.58606 19.7725 8.2627 19.0732C6.93933 18.374 5.83882 17.3175 5.08594 16.0239" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
		</svg>
	</div>
	<div id="titleBar"> <!-- Some kind of title(? Maybe the title is also the configs button. -->
		Cute Notes uwu
	</div>
	<div class="roundIcons" onclick="//newTaskPop()">
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="Edit / Add_Plus_Circle">
			<path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
		</svg>
	</div>
</nav>



<style>
	nav, nav > div {
		display: flex;
		align-items: center;
	}

	nav {
		width: 100%;
		height: var(--navHeight);

		padding: calc((var(--navHeight) - var(--navIconSize)) / 2) 10px;
	
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

		transition: transform .4s ease;
	}

	.roundIcons:hover {
		transform: rotate(90deg);
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
