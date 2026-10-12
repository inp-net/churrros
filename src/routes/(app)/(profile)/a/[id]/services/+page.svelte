<script lang="ts">
    import { page } from '$app/state';
    import {
        studentAssociationRepository,
        type CardService as CardServiceType
    } from '#lib/api/index.ts';
    import CardService from '#lib/components/card/CardService.svelte';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    const query = createInfiniteQuery(() => ({
        queryKey: ['studentAssociation', page.params.id, 'services', 'all'],
        queryFn: ({ pageParam }) =>
            studentAssociationRepository.getStudentAssociationServices(page.params.id, {
                first: 10,
                after: pageParam
            }),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        notifyOnChangeProps: 'all'
    }));

    const services: CardServiceType[] = $derived(
        query.data?.pages.flatMap((page) => page.items) ?? []
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
        {#each services as service (service.id)}
            <CardService {service} />
        {/each}
    {/if}
</InfiniteScroll>
