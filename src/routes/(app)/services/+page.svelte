<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';

    import { serviceRepository } from '#lib/api/index.ts';
    import CardService from '#lib/components/card/CardService.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const query = createQuery(() => ({
        notifyOnChangeProps: 'all',
        queryFn: () => serviceRepository.getServices(),
        queryKey: ['services'],
    }));
</script>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#each query.data as service (service.id)}
        <CardService {service} />
    {/each}
{/if}
