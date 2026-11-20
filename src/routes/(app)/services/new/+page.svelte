<script lang="ts">
    import { goto } from '$app/navigation';
    import { createQuery, useQueryClient } from '@tanstack/svelte-query';

    import {
        groupRepository,
        serviceRepository,
        studentAssociationRepository,
    } from '#lib/api/index.ts';
    import type { ServiceInput } from '#lib/forms/service/service.schema.ts';
    import ServiceForm from '#lib/forms/service/ServiceForm.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const queryClient = useQueryClient();

    async function createService(data: ServiceInput) {
        await serviceRepository.upsertService(data);
        //Invalidate the query cache to see the new one
        queryClient.invalidateQueries({ queryKey: ['services'] });
        await goto(`/services`);
    }

    const query = createQuery(() => ({
        queryFn: () => studentAssociationRepository.canCreateServicesOn(),
        queryKey: ['me', 'canCreateServicesOn'],
    }));

    const queryGroups = createQuery(() => ({
        queryFn: () => groupRepository.getGroupsAvatar(),
        queryKey: ['me', 'groups'],
    }));
</script>

{#if query.isPending || queryGroups.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError || queryGroups.isError}
    <p>ERROR</p>
{:else if query.data && queryGroups.data}
    <ServiceForm
        onsubmit={createService}
        studentAssociations={query.data.studentAssociations}
        groups={queryGroups.data}
        schools={query.data.schools}
    />
{/if}
