<script lang="ts">
    import { goto, refreshAll } from '$app/navigation';
    import { onMount } from 'svelte';

    //Pompé partiellement de l'app churros

    onMount(async () => {
        //TODO : Reset du cache ?
        await refreshAll();
        await goto('/');
    });
</script>

<p>CHARGEMENT</p>
