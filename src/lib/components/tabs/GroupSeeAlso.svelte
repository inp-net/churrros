<script lang="ts">
    import Avatar from '../avatar/Avatar.svelte';
    import type { GroupSeeAlso } from '#lib/api/index.ts';

    interface Props {
        groupSeeAlso: GroupSeeAlso;
    }

    let { groupSeeAlso }: Props = $props();
</script>

<div>
    {#each groupSeeAlso.familyChildren as familyChildren (familyChildren.uid)}
        <Avatar avatar={familyChildren} />
        <p>{familyChildren.description}</p>
    {/each}
    {#each groupSeeAlso.related as related (related.uid)}
        <Avatar avatar={related} />
        <p>{related.description}</p>
    {/each}
</div>
