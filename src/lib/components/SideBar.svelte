<script>
	import { defaults } from "../../stores.js";
</script>



<div id="sideBar">
	{#each $defaults.timeSpan as hour}
		<div class="sideElement">
			{hour}
		</div>
	{/each}
</div>



<style>
	#sideBar {
		width: 120px;

		padding-right: 10px;
		padding-bottom: 10px;

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
