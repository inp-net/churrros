<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Event } from '$lib/api';
	import CardTicket from './CardTicket.svelte';
	import GroupAvatar from '../avatar/GroupAvatar.svelte';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();
</script>

<div>
	<a href={`/events/${event.id}`}>
		{event.title}
	</a>
	<br />
	<GroupAvatar groupInfo={event.organizer} />
	{#each event.coOrganizers as coOrganizer (coOrganizer.uid)}
		<GroupAvatar groupInfo={coOrganizer} />
	{/each}
	<br />
	<img src={event.pictureURL} alt={event.title} />
	<br />
	Debut : {event.startsAt?.toLocaleString() ?? 'N/A'}
	<br />
	Fin : {event.endsAt?.toLocaleString() ?? 'N/A'}
	<br />
	<p>{event.descriptionPreview}</p>
	<br />
	Tickets :
	{#each event.tickets as ticket (ticket.id)}
		<CardTicket {ticket} />
	{/each}
</div>
