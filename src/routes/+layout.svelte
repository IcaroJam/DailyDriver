<script>
	export const prerender = true; // The whole site is static, prerender everything.

	import NavBar from "$lib/components/NavBar.svelte";

	import "../app.css"
</script>



<NavBar />
<slot />
