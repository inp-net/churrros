<script lang="ts">
    import type { UserGroups } from '$lib/api';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        userGroups: UserGroups;
    }

    let { userGroups }: Props = $props();
</script>

<div>
    {#each userGroups.groups as groupMember (groupMember.group.uid)}
        <Avatar avatar={groupMember.group} />
        <!-- QUESTION : In Churros V2 there is a roleemojis that gives the users emoji fro their role-->
        <!--I believe this should only be client side and has nothing to do with the server -->
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
    {/each}
</div>
