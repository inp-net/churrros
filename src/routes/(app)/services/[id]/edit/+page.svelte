<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
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

    async function updateService(data: ServiceInput) {
        await serviceRepository.upsertService(data, page.params.id);
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

    const queryServiceInput = createQuery(() => ({
        queryFn: () => serviceRepository.getServiceInfo(page.params.id),
        queryKey: ['service', page.params.id],
    }));
</script>

{#if query.isPending || queryGroups.isPending || queryServiceInput.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError || queryGroups.isError || queryServiceInput.isError}
    <p>ERROR</p>
{:else if query.data && queryGroups.data && queryServiceInput.data}
    <ServiceForm
        onsubmit={updateService}
        studentAssociations={query.data.studentAssociations}
        groups={queryGroups.data}
        schools={query.data.schools}
        service={queryServiceInput.data}
    />
{/if}
