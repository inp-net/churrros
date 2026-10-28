<script lang="ts">
    import { page } from '$app/state';
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    import { type GroupAvatar, studentAssociationRepository } from '#lib/api/index.ts';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const query = createInfiniteQuery(() => ({
            getNextPageParam: (lastPage) =>
                lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
            initialPageParam: null as string | null,
            notifyOnChangeProps: 'all',
            queryFn: ({ pageParam }) =>
                studentAssociationRepository.getStudentAssociationGroups(
                    ['StudentAssociationSection'],
                    { after: pageParam, first: 10 },
                    page.params.id,
                ),
            queryKey: ['studentAssociation', page.params.id, 'boards', 'all'],
        })),
        boards: GroupAvatar[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
</script>

<InfiniteScroll
    hasNextPage={query.hasNextPage}
    isFetching={query.isFetchingNextPage}
    loadMore={query.fetchNextPage}
    rootMargin="0px 0px 400px 0px"
>
    {#if query.isPending}
        <p>{m['loading']()}</p>
    {:else if query.isError}
        <p>Error: {query.error.message}</p>
    {:else if query.isSuccess}
        {#each boards as board (board.uid)}
            <Avatar avatar={board} />
            <p>{board.name}</p>
            <p>{board.description}</p>
        {/each}
    {/if}
</InfiniteScroll>
