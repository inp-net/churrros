<script lang="ts">
    import { goto, refreshAll } from '$app/navigation';
    import { onMount } from 'svelte';

    import { m } from '#lib/paraglide/messages.js';

    onMount(async () => {
        await refreshAll();
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
