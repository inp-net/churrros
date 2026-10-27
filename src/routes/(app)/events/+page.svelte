<script lang="ts">
    import { createInfiniteQuery } from '@tanstack/svelte-query';
    import { eventRepository, type EventsByDay } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import CardEventsByDay from '#lib/components/card/CardEventsByDay.svelte';
    import { toISODate } from '#lib/utils/dates.ts';
    import { Flex, Scroll, Skeleton } from 'azucar-ui';
    import CardEventDay from '#lib/components/card/CardEventDay.svelte';

    const today = toISODate(new Date());

    const query = createInfiniteQuery(() => ({
        queryKey: ['events'],
        queryFn: ({ pageParam }) => eventRepository.getEvents({ first: 10, after: pageParam }),
        initialPageParam: today,
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        notifyOnChangeProps: 'all'
    }));

    // We derive the events from the query data, to have them in an iterable format.
    const events: EventsByDay[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);

    // Get date of monday on current week
    const monday = new Date();
    monday.setDate(monday.getDate() - monday.getDay() + 1);
</script>

<h3>{m.events()}</h3>

<Flex gap="xs" style="position: sticky !important; width: 100%; top: 0;">
    {#each Array(7) as _, index}
        <CardEventDay
            date={new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index)}
            numberOfEvents={Math.floor(Math.random() * 5)}
            selected={index === 0}
        />
    {/each}
</Flex>

{#if query.isPending}
    {#each Array(4) as _}
        <Skeleton height={`calc(var(--size-xxl) * ${Math.random() * 3 + 1})`} />
    {/each}
{:else if query.isSuccess}
    <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetching={query.isFetchingNextPage}
        loadMore={query.fetchNextPage}
        rootMargin="0px 0px 400px 0px"
    >
        {#each events as event (event.date)}
            <CardEventsByDay {event} />
            <br />
        {/each}
    </InfiniteScroll>
{/if}
