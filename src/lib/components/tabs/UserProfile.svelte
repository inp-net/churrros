<script lang="ts">
    import type { UserProfile } from '#lib/api/index.ts';
    import HeaderName from '#lib/components/HeaderName.svelte';

    interface Props {
        userProfile: UserProfile;
    }

    let { userProfile }: Props = $props();
</script>

<HeaderName
    name={userProfile.fullName}
    year={userProfile.yearTier}
    nickname={userProfile.nickname}
    pictureURL={userProfile.pictureURL}
    description={userProfile.description}
    badges={[userProfile.major]}
    links={userProfile.links}
/>

<div>
    <!-- {#each userProfile.school as school (school.uid)} -->
    <!--     <Avatar avatar={school} /> -->
    <!-- {/each} -->
    <!-- {#each userProfile.links as link (link.url)} -->
    <!--     <LinkPill {link} /> -->
    <!-- {/each} -->
    <!-- Bot : {userProfile.bot} -->
    <!-- Admin : {userProfile.admin} <br /> -->
    <!-- {userProfile.description} -->
    <!-- More HTML that I don't want to render-->
</div>
