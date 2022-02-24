<script>
import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import '../../app.css';
	onMount(async () => {
	
		themeChange(false);
	});
</script>
<main class="container mx-auto">

<slot/>
</main>
