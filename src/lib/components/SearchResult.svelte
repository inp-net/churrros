<script lang="ts">
    import { Stack, Avatar, Flex, Button } from 'azucar-ui';

    import type { SearchResult } from '../api';
    import type { Avatar as AvatarType, Event } from '../api/types';

    interface Props {
        searchResult: SearchResult;
    }

    let { searchResult }: Props = $props();
</script>

{#snippet searchResultItem(url: string, pictureURL: string, title: string, subtitle: string)}
    <Button variant="ghost" class="search-result-item" href={url}>
        <Flex align="center">
            <Avatar src={pictureURL} alt={title} size="xl" />
            <Stack gap="zero">
                <p class="search-title">{title}</p>
                <small class="search-subtitle">{subtitle}</small>
            </Stack>
        </Flex>
    </Button>
{/snippet}

{#if searchResult.type === 'Users'}
    {@const avatar = searchResult.content as AvatarType}
    {@render searchResultItem(`/u/${avatar.uid}`, avatar.pictureURL, avatar.name, `@${avatar.uid}`)}
{:else if searchResult.type === 'Groups'}
    {@const avatar = searchResult.content as AvatarType}
    {@render searchResultItem(`/g/${avatar.uid}`, avatar.pictureURL, avatar.name, `@${avatar.uid}`)}
{:else if searchResult.type === 'Events'}
    {@const event = searchResult.content as Event}
    {@render searchResultItem(
        `/events/${event.id}`,
        event.pictureURL,
        event.title,
        event.organizer.name,
    )}
{/if}

<style>
    :global(.search-result-item) {
        padding: 0 !important;
    }

    .search-title {
        font-weight: bold;
    }

    .search-subtitle {
        font-weight: normal;
    }
</style>
