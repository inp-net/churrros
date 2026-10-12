<script lang="ts">
    import type { SchoolInfos } from '#lib/api/index.ts';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        schoolInfo: SchoolInfos;
    }
    let { schoolInfo }: Props = $props();
</script>

<div>
    {schoolInfo.address}
    {#each schoolInfo.studentAssociations as studentAssociation (studentAssociation.uid)}
        <Avatar avatar={studentAssociation} link={`/a/${studentAssociation.uid}`} />
    {/each}
</div>
