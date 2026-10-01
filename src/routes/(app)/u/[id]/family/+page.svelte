<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '$lib/api';
    import { m } from '$lib/paraglide/messages';
    import { createQuery } from '@tanstack/svelte-query';

    const query = createQuery(() => ({
        queryKey: ['user', page.params.id, 'family'],
        queryFn: () => userRepository.getUserFamily(page.params.id)
    }));
</script>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <!--If the user is not found-->
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {query.data}
{/if}
