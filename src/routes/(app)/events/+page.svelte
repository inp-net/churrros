<script lang="ts">
    import { createInfiniteQuery } from '@tanstack/svelte-query';
    import { eventRepository, type EventsByDay } from '#lib/api/index.ts';
    import { m, today } from '#lib/paraglide/messages.js';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import CardEventsByDay from '#lib/components/card/CardEventsByDay.svelte';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import { Flex, Skeleton, Stack } from 'azucar-ui';
    import CardEventDay from '#lib/components/card/CardEventDay.svelte';

    // Today date at midnight
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // Create an infinite query to fetch events, starting from today
    const query = createInfiniteQuery(() => ({
        queryKey: ['events'],
        queryFn: ({ pageParam }) => eventRepository.getEvents({ first: 10, after: pageParam }),
        initialPageParam: todayDate.toISOString(),
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined
    }));

    let selectedDate = $state(todayDate);

    // We derive the events from the query data, to have them in an iterable format.
    const events: EventsByDay[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);

    // Get date of monday on current week
    const monday = new Date(todayDate);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

    function eventCountForDate(date: Date): number {
        const day = events.find((event) => event.date === date.toISOString());
        return (day?.shotgunning.length ?? 0) + (day?.happening.length ?? 0);
    }

    function scrollToDay(date: Date) {
        selectedDate = date;

        const element = document.getElementById(`events-${date.toISOString()}`);
        if (element) {
            element.scrollIntoView();
        } else {
            // Scroll to top
            window.scrollTo({ top: 0 });
        }
    }

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date;
    });
</script>

<h3>{m.events()}</h3>

<Stack gap="zero">
    <Flex gap="xs" class="event-day-selection">
        {#each daysOfWeek as date (date.toISOString())}
            <CardEventDay
                {date}
                eventCount={eventCountForDate(date)}
                selected={selectedDate.toISOString() === date.toISOString()}
                today={todayDate.toISOString() === date.toISOString()}
                onclick={() => scrollToDay(date)}
            />
        {/each}
    </Flex>

    <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetching={query.isFetchingNextPage || query.isPending}
        loadMore={query.fetchNextPage}
        rootMargin="0px 0px 400px 0px"
    >
        {#snippet loading()}
            <Stack>
                {#each Array(4) as _}
                    <Skeleton height={`calc(var(--size-xxl) * ${Math.random() * 3 + 1})`} />
                {/each}
            </Stack>
        {/snippet}

        {#each events as event (event.date)}
            <section id={`events-${event.date}`} class="events-day">
                <h3>
                    {formatISODateToLocale(event.date, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h3>
                <CardEventsByDay {event} />
            </section>
        {/each}
    </InfiniteScroll>
</Stack>

<style>
    :global(.event-day-selection) {
        position: sticky;
        top: 0;
        z-index: 1;
        backdrop-filter: blur(var(--size-sm));
        padding: var(--size-sm);
        border-radius: var(--corner-radius-sm);
    }

    .events-day {
        scroll-margin-top: calc(2 * var(--size-xl));
    }

    .events-day h3 {
        margin: var(--size-md) 0;
    }
</style>
