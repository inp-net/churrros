<script lang="ts">
    import { createInfiniteQuery } from '@tanstack/svelte-query';
    import { bookingRepository, type Booking } from '$lib/api';
    import { m } from '$lib/paraglide/messages';
    import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
    import CardBooking from '$lib/components/card/CardBooking.svelte';

    const query = createInfiniteQuery(() => ({
        queryKey: ['bookings'],
        queryFn: ({ pageParam }) =>
            bookingRepository.getMyBookings({ first: 10, after: pageParam }),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        notifyOnChangeProps: 'all'
    }));

    const bookings: Booking[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
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
