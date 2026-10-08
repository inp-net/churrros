<script lang="ts">
    import type { SchoolProfile } from '$lib/api';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        profile: SchoolProfile;
    }

    let { profile }: Props = $props();
</script>

<Avatar avatar={profile.school} />
{profile.activeStudentsCount}
{profile.studentsCount}
<p>{profile.description}</p>
