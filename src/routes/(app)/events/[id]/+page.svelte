<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { eventRepository } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import CardTicketDetail from '$lib/components/card/CardTicketDetail.svelte';
	import { formatISODateToLocale } from '$lib/utils/locale';
	import Avatar from '$lib/components/avatar/Avatar.svelte';

	const query = createQuery(() => ({
		queryKey: ['event', page.params.id],
		queryFn: () => eventRepository.getEventById(page.params.id)
	}));
	//Gestion null ? Si l'event est a null alors 404
</script>

<h1>{m.events()}</h1>

<div>
	{#if query.isPending}
		<p>{m.loading()}</p>
	{:else if query.isError}
		<p>Error: {query.error.message}</p>
	{:else if query.isSuccess && query.data}
		{query.data?.title} <br />
		{query.data.location} <br />
		{query.data.startsAt ? formatISODateToLocale(query.data.startsAt) : 'N/A'} <br />
		{query.data.endsAt ? formatISODateToLocale(query.data.endsAt) : 'N/A'} <br />
		{query.data.frequency} <br />
		{query.data.recurringUntil ? formatISODateToLocale(query.data.recurringUntil) : 'N/A'} <br />
		{query.data.externalTicketing} <br />
		<p>
			{query.data.description}
		</p>

		<Avatar avatar={query.data?.organizer} />
		{#each query.data.coOrganizers as coOrganizer (coOrganizer.uid)}
			<Avatar avatar={coOrganizer} />
		{/each}
		Tickets :
		{#each query.data.tickets as ticket (ticket.id)}
			<CardTicketDetail {ticket} />
		{/each}
	{/if}
</div>
