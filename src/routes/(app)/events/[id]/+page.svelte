<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { eventRepository } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import GroupAvatar from '$lib/components/GroupAvatar.svelte';
	import Ticket from '$lib/components/CardTicket.svelte';

	const query = createQuery(() => ({
		queryKey: ['events'],
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
		<p>
			<!--Voir comment le rendre XSS safe-->
			{query.data.descriptionHtml}
		</p>

		<GroupAvatar groupInfo={query.data?.organizer} />
		{#each query.data.coOrganizers as coOrganizer (coOrganizer.uid)}
			<GroupAvatar groupInfo={coOrganizer} />
		{/each}
		{#each query.data.tickets as ticket (ticket.id)}
			<Ticket {ticket} />
		{/each}
	{/if}
</div>
