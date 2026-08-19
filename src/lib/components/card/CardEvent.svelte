<script lang="ts">
	import type { Event } from '$lib/api';
	import CardTicket from './CardTicket.svelte';
	import GroupAvatar from '../avatar/GroupAvatar.svelte';
	import { formatISODateToLocale } from '$lib/utils/locale';

	interface Props {
		/**
		 * L'event à afficher dans la carte
		 */
		event: Event;
		/**
		 * Si on annonce le shotgun qui s'ouvre plutot que l'event
		 */
		shotgun?: boolean;
	}

	let { event, shotgun }: Props = $props();
</script>

<div>
	{#if shotgun}
		<p>Shotgun s'ouvre pour :</p>
	{/if}
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
	Debut : {event.startsAt ? formatISODateToLocale(event.startsAt) : 'N/A'}
	<br />
	Fin : {event.endsAt ? formatISODateToLocale(event.endsAt) : 'N/A'}
	<br />
	<p>{event.descriptionPreview}</p>
	<br />
	Tickets :
	{#each event.tickets as ticket (ticket.id)}
		<CardTicket {ticket} />
	{/each}
</div>
