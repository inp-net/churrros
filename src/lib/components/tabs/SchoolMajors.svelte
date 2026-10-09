<script lang="ts">
    import type { MajorInfos } from '#lib/api/index.ts';
    import CardMajor from '../card/CardMajor.svelte';

    interface Props {
        schoolMajors: MajorInfos[];
    }

    let { schoolMajors }: Props = $props();
</script>

{#each schoolMajors as major (major.avatar.uid)}
    <CardMajor {major} />
{/each}
