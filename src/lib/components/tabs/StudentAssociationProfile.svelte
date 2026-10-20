<script lang="ts">
    import type { StudentAssociationProfile } from '#lib/api/index.ts';
    import Avatar from '../avatar/Avatar.svelte';
    import LinkPill from '../LinkPill.svelte';

    interface Props {
        studentAssociationProfile: StudentAssociationProfile;
    }

    let { studentAssociationProfile }: Props = $props();
</script>

<Avatar avatar={studentAssociationProfile.studentAssociation} />
{studentAssociationProfile.email}
<p>{studentAssociationProfile.description}</p>
{studentAssociationProfile.activeMembersCount}
{studentAssociationProfile.membersCount}

{#each studentAssociationProfile.links as link}
    <LinkPill {link} />
{/each}

<Avatar avatar={studentAssociationProfile.school} />
