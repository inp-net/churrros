<script lang="ts">
    import { page } from '$app/state';
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    import {
        type CardService as CardServiceType,
        studentAssociationRepository,
    } from '#lib/api/index.ts';
    import CardService from '#lib/components/card/CardService.svelte';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const query = createInfiniteQuery(() => ({
            getNextPageParam: (lastPage) =>
                lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
            initialPageParam: null as string | null,
            notifyOnChangeProps: 'all',
            queryFn: ({ pageParam }) =>
                studentAssociationRepository.getStudentAssociationServices(page.params.id, {
                    after: pageParam,
                    first: 10,
                }),
            queryKey: ['studentAssociation', page.params.id, 'services', 'all'],
        })),
        services: CardServiceType[] = $derived(
            query.data?.pages.flatMap((page) => page.items) ?? [],
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
