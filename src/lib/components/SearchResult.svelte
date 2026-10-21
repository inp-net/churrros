<script lang="ts">
    import type { SearchResult } from '../api';
    import type { Avatar as AvatarType, Event } from '../api/types';
    import Avatar from './avatar/Avatar.svelte';
    import CardEvent from './card/CardEvent.svelte';

    interface Props {
        searchResult: SearchResult;
    }

    let { searchResult }: Props = $props();
</script>

<div>
    {#if searchResult.type === 'Users'}
        {@const avatar = searchResult.content as AvatarType}
        <Avatar {avatar} link={'/u/' + avatar.uid} />
    {:else if searchResult.type === 'Groups'}
        {@const avatar = searchResult.content as AvatarType}
        <Avatar {avatar} link={'/g/' + avatar.uid} />
    {:else if searchResult.type === 'Events'}
        {@const event = searchResult.content as Event}
        <CardEvent {event} />
    {/if}
</div>
