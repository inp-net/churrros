<script lang="ts">
    import { goto } from '$app/navigation';
    import { clearToken } from '#lib/auth/session.ts';
    import { onMount } from 'svelte';
    import { m } from '#lib/paraglide/messages.js';
    // TODO : Delete the authed via token
    onMount(async () => {
        clearToken();
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
