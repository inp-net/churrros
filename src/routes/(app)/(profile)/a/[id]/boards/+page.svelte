<script lang="ts">
    import { page } from '$app/state';
    import { studentAssociationRepository, type GroupAvatar } from '$lib/api';
    import Avatar from '$lib/components/avatar/Avatar.svelte';
    import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
    import { m } from '$lib/paraglide/messages';
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    const query = createInfiniteQuery(() => ({
        queryKey: ['studentAssociation', page.params.id, 'boards', 'all'],
        queryFn: ({ pageParam }) =>
            studentAssociationRepository.getStudentAssociationGroups(
                page.params.id,
                ['StudentAssociationSection'],
                { first: 10, after: pageParam }
            ),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        notifyOnChangeProps: 'all'
    }));

    const boards: GroupAvatar[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
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
