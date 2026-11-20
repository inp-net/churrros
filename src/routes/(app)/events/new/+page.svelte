<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';

    import { meRepository } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';

    const query = createQuery(() => ({
        queryFn: () => meRepository.getCanCreateEventsOn(),
        queryKey: ['canCreateEventsOn'],
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
