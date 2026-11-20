<script lang="ts">
    import type { UserGroups } from '#lib/api/index.ts';
    import { Stack } from 'azucar-ui';
    import GroupMemberAvatar from '../avatar/GroupMemberAvatar.svelte';

    interface Props {
        userGroups: UserGroups;
    }

    let { userGroups }: Props = $props();
</script>

<Stack gap="sm">
    {#each userGroups.groups as groupMember (groupMember.avatar.uid)}
        <GroupMemberAvatar {groupMember} showMember={false} />
    {/each}
</Stack>
