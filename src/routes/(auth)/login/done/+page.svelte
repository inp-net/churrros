<script lang="ts">
    import { goto, refreshAll } from '$app/navigation';
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    import { setToken } from '#lib/auth/session.ts';
    import { m } from '#lib/paraglide/messages.js';

    onMount(async () => {
        const token = page.url.searchParams.get('token');
        if (token) {
            await setToken({
                token,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60),
            });
        }

        await refreshAll();

        //TODO : Handle redirection
        await goto('/');
    });
</script>

<p>{m['loading']()}</p>
