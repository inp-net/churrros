<script lang="ts">
    import type { Event } from '#lib/api/index.ts';
    import CardTicket from './CardTicket.svelte';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        /**
         * The event to display in the card event component
         */
        event: Event;
        /**
         * If the event is a shotgun event or not
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
    <Avatar avatar={event.organizer} />
    {#each event.coOrganizers as coOrganizer (coOrganizer.uid)}
        <Avatar avatar={coOrganizer} />
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
