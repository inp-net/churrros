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

<h3>{m['service.title']()}</h3>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    <!-- Pour l'instant on ne refait que le frontend, les interactions avec le back seront faites plus tard.
    <a href="/services/new">
        {m['service.new']()}
    </a> 
    -->

    <div class="services">
        {#each query.data as service (service.id)}
            <CardService {service} />
        {/each}
    </div>
{/if}

<style>
    .services {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--size-md);
    }

    @media (min-width: 768px) {
        .services {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>
