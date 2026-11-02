<script lang="ts">
    import { goto, refreshAll } from '$app/navigation';
    import { onMount } from 'svelte';

    import { clearToken } from '#lib/auth/session.ts';
    import { m } from '#lib/paraglide/messages.js';

    onMount(async () => {
        clearToken();
        await refreshAll();
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
