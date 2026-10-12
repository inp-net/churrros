<script lang="ts">
    import type { GroupMember } from '#lib/api/index.ts';
    import Avatar from './Avatar.svelte';

    interface Props {
        groupMember: GroupMember;
        showMember: boolean; //If true the link will go to the member profile, if false it will go to the group profile
    }

    let { groupMember, showMember }: Props = $props();
</script>

<div>
    <!-- NOTE : In Churros V2 there is a roleemojis property that gives the users emoji for their role-->
    <!--I believe this should only be client side and has nothing to do with the server -->
    <Avatar
        avatar={groupMember.avatar}
        link={showMember ? `/u/${groupMember.avatar.uid}` : `/g/${groupMember.avatar.uid}`}
    />
    <!--For the link it just works, but there might be a better way to do it -->

    {#if groupMember.president}
        <span>👑</span>
    {/if}
    {#if groupMember.vicePresident}
        <span>⭐</span>
    {/if}
    {#if groupMember.secretary}
        <span>📝</span>
    {/if}
    {#if groupMember.treasurer}
        <span>💰</span>
    {/if}
    <p>{groupMember.title}</p>
</div>
