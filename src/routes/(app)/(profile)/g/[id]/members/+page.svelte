<script lang="ts">
    import { page } from '$app/state';
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    import { type GroupMemberByDate, groupRepository } from '#lib/api/index.ts';
    import GroupMemberAvatar from '#lib/components/avatar/GroupMemberAvatar.svelte';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const query = createInfiniteQuery(() => ({
            getNextPageParam: (lastPage) =>
                lastPage?.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
            initialPageParam: null as string | null,
            notifyOnChangeProps: 'all',
            queryFn: ({ pageParam }) =>
                groupRepository.getGroupMembers({ after: pageParam, first: 20 }, page.params.id),
            queryKey: ['group', page.params.id, 'members'],
        })),
        groupMembers: GroupMemberByDate[] = $derived(
            query.data?.pages.flatMap((page) => page!.items) ?? [],
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
