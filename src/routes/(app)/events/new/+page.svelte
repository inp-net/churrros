<script lang="ts">
    import { meRepository } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import { createQuery } from '@tanstack/svelte-query';

    const query = createQuery(() => ({
        queryKey: ['canCreateEventsOn'],
        queryFn: () => meRepository.getCanCreateEventsOn()
    }));
</script>

<div>
    {#if query.isPending}
        <p>{m['loading']()}</p>
    {:else if query.isError}
        <p>Error: {query.error.message}</p>
    {:else if query.isSuccess}
        {#if query.data.length == 0}
            <!-- NOT IMPLEMENTED -->
        {/if}
    {/if}
</div>
