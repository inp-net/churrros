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
