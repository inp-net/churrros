<script lang="ts">
    import type { GroupBoardMembers } from '#lib/api/index.ts';
    import GroupMemberAvatar from '../avatar/GroupMemberAvatar.svelte';

    interface Props {
        groupBoardMembers: GroupBoardMembers;
    }
    let { groupBoardMembers }: Props = $props();
</script>

<div>
    {groupBoardMembers.membersCount}
    {#each groupBoardMembers.boardMembers as boardMember (boardMember.avatar.uid)}
        <GroupMemberAvatar groupMember={boardMember} showMember={true} />
    {/each}
</div>
