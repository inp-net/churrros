<script lang="ts">
    import { groupRepository } from '#lib/api/index.ts';
    import { page } from '$app/state';
    import { m } from '#lib/paraglide/messages.js';
    import CreateGroupForm from '#lib/forms/group/CreateGroupForm.svelte';
    import type { CreateGroupInput } from '#lib/forms/group/group.schema.ts';

    async function createGroup({ name, uid, groupType }: CreateGroupInput) {}
</script>

<CreateGroupForm onsubmit={createGroup} />
