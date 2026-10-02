<script lang="ts">
    import { page } from '$app/state';
    import { groupRepository, type GroupMemberByDate } from '$lib/api';
    import GroupMemberAvatar from '$lib/components/avatar/GroupMemberAvatar.svelte';
    import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
    import { m } from '$lib/paraglide/messages';
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    const query = createInfiniteQuery(() => ({
        queryKey: ['group', page.params.id, 'members'],
        queryFn: ({ pageParam }) =>
            groupRepository.getGroupMembers(page.params.id, { first: 20, after: pageParam }),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =>
            lastPage?.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        notifyOnChangeProps: 'all'
    }));

    const groupMembers: GroupMemberByDate[] = $derived(
        query.data?.pages.flatMap((page) => page?.items) ?? []
    );
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
        {#each groupMembers as groupMember (groupMember.avatar.uid)}
            <GroupMemberAvatar {groupMember} showMember={true} />
            <br />
        {/each}
    {/if}
</InfiniteScroll>
