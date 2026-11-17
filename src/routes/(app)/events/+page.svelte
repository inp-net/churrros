<script lang="ts">
    import { createInfiniteQuery } from '@tanstack/svelte-query';
    import { Flex, Skeleton, Stack } from 'azucar-ui';

    import { scrollspy } from '#lib/actions/scrollspy.ts';
    import { eventRepository } from '#lib/api/index.ts';
    import CardEventDay from '#lib/components/card/CardEventDay.svelte';
    import CardEventsByDay from '#lib/components/card/CardEventsByDay.svelte';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';

    const DAYS_IN_WEEK = 7;
    const WEEK_COUNT = 4;
    const MILLISECONDS_IN_WEEK = DAYS_IN_WEEK * 24 * 60 * 60 * 1000;

    const pad = (value: number) => String(value).padStart(2, '0');
    const formatDateToISO = (date: Date) => {
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const monday = new Date(todayDate);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

    const query = createInfiniteQuery(() => ({
        queryKey: ['events'],
        queryFn: ({ pageParam }) => eventRepository.getEvents({ after: pageParam, first: 10 }),
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
        initialPageParam: todayDate.toISOString(),
    }));

    let selectedDate = $state(formatDateToISO(todayDate));
    let eventDaySelectionWrapper: HTMLDivElement;
    let visibleWeekIndex = -1;

    const eventsByDay = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);

    function eventCountForDate(date: Date): number {
        const day = eventsByDay.find((event) => event.date === formatDateToISO(date));
        return day?.happening.length ?? 0;
    }

    function daysOfWeek(weekIndex: number): Date[] {
        return Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + dayIndex + weekIndex * DAYS_IN_WEEK);
            return date;
        });
    }

    function weekIndexForDate(date: string): number {
        const selected = new Date(`${date}T00:00:00`);
        return Math.max(
            0,
            Math.min(
                WEEK_COUNT - 1,
                Math.floor((selected.getTime() - monday.getTime()) / MILLISECONDS_IN_WEEK),
            ),
        );
    }

    function scrollToDay(date: Date) {
        const dateString = formatDateToISO(date);
        selectedDate = dateString;

        const element = document.getElementById(`events-${dateString}`);
        element?.scrollIntoView();

        if (!element) {
            window.scrollTo({ top: 0 });
        }
    }

    function scrollToWeek(index: number) {
        if (!eventDaySelectionWrapper) {
            return;
        }

        eventDaySelectionWrapper.scrollTo({
            left: index * eventDaySelectionWrapper.clientWidth,
            behavior: 'smooth',
        });
    }

    $effect(() => {
        const weekIndex = weekIndexForDate(selectedDate);
        if (weekIndex === visibleWeekIndex) {
            return;
        }

        visibleWeekIndex = weekIndex;
        scrollToWeek(weekIndex);
    });
</script>

<h3>{m['next_events']()}</h3>

<Stack gap="zero">
    <div class="event-day-selection-wrapper" bind:this={eventDaySelectionWrapper}>
        {#each Array(WEEK_COUNT) as _, index (index)}
            <Flex gap="xs" class="event-day-selection">
                {#each daysOfWeek(index) as date (date.toISOString())}
                    <CardEventDay
                        {date}
                        eventCount={eventCountForDate(date)}
                        selected={selectedDate === formatDateToISO(date)}
                        today={formatDateToISO(todayDate) === formatDateToISO(date)}
                        onclick={() => scrollToDay(date)}
                    />
                {/each}
            </Flex>
        {/each}
    </div>

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

        {#each eventsByDay as eventsThisDay (eventsThisDay.date)}
            <section
                id={`events-${eventsThisDay.date}`}
                class="events-day"
                use:scrollspy={() => (selectedDate = eventsThisDay.date)}
            >
                <h3>
                    {formatISODateToLocale(`${eventsThisDay.date}T00:00:00`, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                    })}
                </h3>
                <CardEventsByDay event={eventsThisDay} />
            </section>
        {/each}
    </InfiniteScroll>
</Stack>

<style>
    :global(.event-day-selection-wrapper) {
        display: flex;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        position: sticky;
        top: calc(var(--size-md) + env(safe-area-inset-top));
        z-index: 1;
        backdrop-filter: blur(var(--size-sm));
        scroll-snap-type: x mandatory;
    }

    :global(.event-day-selection) {
        width: 100%;
        flex: 0 0 100%;
        scroll-snap-align: start;
    }

    .events-day {
        scroll-margin-top: calc(2 * var(--size-xl));
    }

    .events-day h3 {
        margin: var(--size-md) 0;
    }
</style>
