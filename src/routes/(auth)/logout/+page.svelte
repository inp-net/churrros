<script lang="ts">
	import { goto } from '$app/navigation';
	import { clearToken } from '$lib/auth/session';
	import { onMount } from 'svelte';

	onMount(async () => {
		clearToken();
		await goto('/');
	});
</script>

<p>CHARGEMENT...</p>
