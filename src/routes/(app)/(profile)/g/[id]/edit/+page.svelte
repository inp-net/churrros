<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { createQuery } from '@tanstack/svelte-query';

    import { groupRepository, meRepository } from '#lib/api/index.ts';
    import EditGroupForm from '#lib/forms/group/EditGroupForm.svelte';
    import type { UpdateGroupPatch } from '#lib/forms/group/group.schema.ts';
    import { m } from '#lib/paraglide/messages.js';

    async function updateGroup(data: UpdateGroupPatch) {
        console.log('Updating group with data:', data);
        await groupRepository.updateGroup(data, page.params.id);
        // TODO : Show toast
        goto(`/g/${page.params.id}`);
    }

    const query = createQuery(() => ({
            queryFn: () => meRepository.getCanCreateGroupsOn(),
            queryKey: ['me', 'canCreateGroupsOn'],
        })),
        queryPermissions = createQuery(() => ({
            queryFn: () => groupRepository.getGroupPermissions(page.params.id),
            queryKey: ['group', page.params.id, 'permissions'],
        })),
        queryGroup = createQuery(() => ({
            enabled: queryPermissions.isSuccess,
            queryFn: () => groupRepository.getGroupEditInfo(queryPermissions.data!, page.params.id),
            queryKey: ['group', page.params.id, 'edit-info'],
        }));

    // TODO: Handle permissions (right now everybody can be here despite not having the right to create/modify any groups)
</script>

{#if query.isPending || queryPermissions.isPending || queryGroup.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError || queryPermissions.isError || queryGroup.isError}
    <p>ERROR</p>
{:else if query.data && queryPermissions.data && queryGroup.data}
    <EditGroupForm
        onsubmit={updateGroup}
        studentAssociations={query.data}
        group={queryGroup.data}
        permissions={queryPermissions.data}
    />
{/if}
