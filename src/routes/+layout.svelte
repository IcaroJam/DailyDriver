<script>
	import "../app.css"
	import { defaults } from "../stores";

	// Add useful stuff to the config:
	$defaults.timeSpan = [...Array($defaults.endTime).keys()].filter((num) => num >= $defaults.startTime);
</script>



<slot />
