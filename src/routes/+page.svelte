<script>
	import NavBar from "../lib/components/NavBar.svelte";
    import SideBar from "../lib/components/SideBar.svelte";
	import TaskBar from "../lib/components/TaskBar.svelte";
</script>



<NavBar />
<div class="scrollable-container">
	<SideBar />
	<TaskBar />
</div>



<style>
	.scrollable-container {
		width: 100%;
		height: calc(100% - var(--navHeight));

		padding-bottom: 10px;

		position: absolute;
		top: var(--navHeight);

		display: flex;

		overflow-y: auto;
	}
</style>
