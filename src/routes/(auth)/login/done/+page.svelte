<script lang="ts">
    import { goto, refreshAll } from '$app/navigation';
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    import { m } from '#lib/paraglide/messages.js';
    import { platform } from '#lib/platform/index.ts';

    onMount(async () => {
        const token = page.url.searchParams.get('token');
        if (token) {
            await platform.storage.set('authToken', token);
        }

        await refreshAll();

        //TODO : Handle redirection
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
