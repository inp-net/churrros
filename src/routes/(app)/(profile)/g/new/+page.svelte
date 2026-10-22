<script lang="ts">
    import { meRepository, groupRepository } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import CreateGroupForm from '#lib/forms/group/CreateGroupForm.svelte';
    import type { CreateGroupInput } from '#lib/forms/group/group.schema.ts';
    import { createQuery } from '@tanstack/svelte-query';
    import { goto } from '$app/navigation';

    async function createGroup({ studentAssociationId, name, uid, groupType }: CreateGroupInput) {
        const result = await groupRepository.createGroup(
            studentAssociationId,
            name,
            uid,
            groupType
        );
        await goto(`/g/${result}`);
    }

    const query = createQuery(() => ({
        queryKey: ['me', 'canCreateGroupsOn'],
        queryFn: () => meRepository.getCanCreateGroupsOn()
    }));

    // TODO: Handle permissions (right now everybody can be here despite not having the right to create any groups)
</script>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>ERROR</p>
{:else if query.data}
    <CreateGroupForm onsubmit={createGroup} studentAssociations={query.data} />
{/if}
