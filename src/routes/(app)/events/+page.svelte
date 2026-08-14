<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import { eventRepository } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { infiniteScroll } from '$lib/utils/scroll.svelte';
	import CardEvent from '$lib/components/card/CardEvent.svelte';

	const query = createInfiniteQuery(() => ({
		queryKey: ['events'],
		queryFn: ({ pageParam }) => eventRepository.getEvents({ first: 10, after: pageParam }),
		initialPageParam: null as string | null, //On cast ici car tanstack definit le type de pageParam ici et sinon c'est du null | undefined
		getNextPageParam: (lastPage) =>
			lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
		notifyOnChangeProps: 'all'
	}));

	//On dérive car la valeur qu'on recup est vraiment à rallonge et on veut juste les items
	const events = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
</script>

<h1>{m.events()}</h1>

<div>
	{#if query.isPending}
		<p>{m.loading()}</p>
	{:else if query.isError}
		<p>Error: {query.error.message}</p>
	{:else if query.isSuccess}
		<div
			use:infiniteScroll={{
				pageInfo: query.data?.pages.at(-1)?.pageInfo,
				loadMore: query.fetchNextPage,
				isFetching: query.isFetchingNextPage
			}}
		>
			{#each events as event (event.id)}
				<CardEvent {event} />
				<br />
			{/each}
		</div>
	{/if}
</div>
