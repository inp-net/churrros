<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import { eventRepository, type EventsByDay } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import CardEventsByDay from '$lib/components/card/CardEventsByDay.svelte';
	import { toISODate } from '$lib/utils/dates';

	const today = toISODate(new Date());

	const query = createInfiniteQuery(() => ({
		queryKey: ['events'],
		queryFn: ({ pageParam }) => eventRepository.getEvents({ first: 1, after: pageParam }),
		initialPageParam: today,
		getNextPageParam: (lastPage) =>
			lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
		notifyOnChangeProps: 'all'
	}));

	//On dérive car la valeur qu'on recup est vraiment à rallonge et on veut juste les items
	const events: EventsByDay[] = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
</script>

<h3>{m.events()}</h3>

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
		{#each events as event (event.date)}
			<CardEventsByDay {event} />
			<br />
		{/each}
	{/if}
	{#snippet loading()}
		<!--Si on veut override le chargement-->
		<p>{m.loading()}</p>
	{/snippet}
</InfiniteScroll>
