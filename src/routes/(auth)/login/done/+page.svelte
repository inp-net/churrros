<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	//Pompé partiellement de l'app churros

	onMount(async () => {
		//TODO : Reset du cache ?
		await invalidateAll();
		await goto('/');
	});
</script>

<p>CHARGEMENT</p>
