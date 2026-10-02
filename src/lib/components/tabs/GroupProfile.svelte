<script lang="ts">
    import type { GroupProfile } from '$lib/api';
    import Avatar from '../avatar/Avatar.svelte';
    import LinkPill from '../LinkPill.svelte';

    interface Props {
        groupProfile: GroupProfile;
    }

    let { groupProfile }: Props = $props();
</script>

<div>
    <Avatar avatar={groupProfile.group} />
    {groupProfile.group.name}
    {groupProfile.email}
    {groupProfile.description}
    <!-- More HTML that I don't want to render-->
    {groupProfile.type}
    {groupProfile.membersCount}
    {groupProfile.activeMembersCount}
    {groupProfile.selfJoinable}
    <Avatar avatar={groupProfile.studentAssociation} />
    {#each groupProfile.links as link (link.url)}
        <LinkPill {link} />
    {/each}
</div>
