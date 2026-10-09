<script lang="ts">
    import type { UserProfile } from '#lib/api/index.ts';
    import Avatar from '../avatar/Avatar.svelte';
    import LinkPill from '../LinkPill.svelte';

    interface Props {
        userProfile: UserProfile;
    }

    let { userProfile }: Props = $props();
</script>

<div>
    <Avatar avatar={userProfile} />
    {userProfile.fullName}
    {userProfile.yearTier}
    {#if userProfile.major}
        <Avatar avatar={userProfile.major} />
    {/if}
    {#each userProfile.school as school (school.uid)}
        <Avatar avatar={school} />
    {/each}
    {#each userProfile.links as link (link.url)}
        <LinkPill {link} />
    {/each}
    Bot : {userProfile.bot}
    Admin : {userProfile.admin} <br />
    {userProfile.description}
    <!-- More HTML that I don't want to render-->
</div>
