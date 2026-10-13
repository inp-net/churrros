<script lang="ts">
    import { m } from '#lib/paraglide/messages.js';
    import { goto, refreshAll } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(async () => {
        await refreshAll();
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
