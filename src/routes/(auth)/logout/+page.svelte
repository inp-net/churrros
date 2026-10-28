<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    import { clearToken } from '#lib/auth/session.ts';
    import { m } from '#lib/paraglide/messages.js';
    // TODO : Delete the authed via token
    onMount(async () => {
        clearToken();
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
