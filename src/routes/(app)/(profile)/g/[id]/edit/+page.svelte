<script lang="ts">
    import { meRepository, groupRepository } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import type { UpdateGroupInput } from '#lib/forms/group/group.schema.ts';
    import { createQuery } from '@tanstack/svelte-query';
    import EditGroupForm from '#lib/forms/group/EditGroupForm.svelte';
    import { page } from '$app/state';

    async function updateGroup(data: UpdateGroupInput) {
        await groupRepository.updateGroup(data);
    }

    const query = createQuery(() => ({
        queryKey: ['me', 'canCreateGroupsOn'],
        queryFn: () => meRepository.getCanCreateGroupsOn()
    }));

    const queryPermissions = createQuery(() => ({
        queryKey: ['group', page.params.id, 'permissions'],
        queryFn: () => groupRepository.getGroupPermissions(page.params.id)
    }));

    // TODO: Handle permissions (right now everybody can be here despite not having the right to create/modify any groups)
</script>

{#if query.isLoading}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>ERROR</p>
{:else if query.data}
    <EditGroupForm onsubmit={updateGroup} studentAssociations={query.data} {group} />
{/if}
