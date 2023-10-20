<script>
	import { defaults } from "../../stores.js";
</script>



<div id="sideBar" style='height: {$defaults.timeSpan.length * 110 + 10 + "px"};'>
	{#each $defaults.timeSpan as hour}
		<div class="sideElement">
			{hour}
		</div>
	{/each}
</div>



<style>
	#sideBar {
		height: 100%;
		width: 120px;

		padding-right: 10px;

		position: absolute;
		top: var(--navHeight);
	
		z-index: 3;
	
		border-radius: 0 0 30px 0;
		background-color: var(--sideBarBackColour);
	}
	
	.sideElement {
		width: 100%;
		height: 100px;
		margin-top: 10px;
		
		display: flex;
		justify-content: center;
		align-items: center;
	
		border-radius: 0 0 30px 0;
		background-color: var(--sideBarElementColour);
	
		font-size: 1.5em;
		color: var(--titleBarColour);
	}
</style>
