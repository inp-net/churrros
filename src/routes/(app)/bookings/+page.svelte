<script lang="ts">
    import { createInfiniteQuery } from '@tanstack/svelte-query';

    import { type Booking, bookingRepository } from '#lib/api/index.ts';
    import CardBooking from '#lib/components/card/CardBooking.svelte';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const query = createInfiniteQuery(() => ({
            getNextPageParam: (lastPage) =>
                lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
            initialPageParam: null as string | null,
            notifyOnChangeProps: 'all',
            queryFn: ({ pageParam }) =>
                bookingRepository.getMyBookings({ after: pageParam, first: 10 }),
            queryKey: ['bookings'],
        })),
        bookings: Booking[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
</script>

<h1>{m.bookings()}</h1>

<InfiniteScroll
    hasNextPage={query.hasNextPage}
    isFetching={query.isFetchingNextPage}
    loadMore={query.fetchNextPage}
    rootMargin="0px 0px 400px 0px"
>
    {#if query.isPending}
        <p>{m.loading()}</p>
    {:else if query.isError}
        <p>Error: {query.error.message}</p>
    {:else if query.isSuccess}
        {#each bookings as booking (booking.id)}
            <CardBooking {booking} />
            <br />
        {/each}
    {/if}
    {#snippet loading()}
        <!--Si on veut override le chargement-->
        <p>{m.loading()}</p>
    {/snippet}
</InfiniteScroll>
