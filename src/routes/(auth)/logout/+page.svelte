<script lang="ts">
    import { goto } from '$app/navigation';
    import { clearToken } from '#lib/auth/session.ts';
    import { onMount } from 'svelte';
    //TODO : Supprimer le cookie d'oAuth2 aussi
    onMount(async () => {
        clearToken();
        await goto('/');
    });
</script>

<p>CHARGEMENT...</p>
