<script lang="ts">
    import type { GroupAvatar, Link, Page } from '#lib/api/index.ts';

    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        groups: Page<GroupAvatar>;
        seeAll: Link;
    }

    let { groups, seeAll }: Props = $props();
</script>

{#each groups.items as group}
    <Avatar avatar={group} />
    <p>{group.name}</p>
    <p>{group.description}</p>
{/each}

{#if groups.pageInfo.hasNextPage}
    <a href={seeAll.url}>{seeAll.text}</a>
{/if}
