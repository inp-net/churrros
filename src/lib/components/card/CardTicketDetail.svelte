<script lang="ts">
    import type { TicketDetail } from '$lib/api';
    import { formatISODateToLocale } from '$lib/utils/dates';
    import Avatar from '$lib/components/avatar/Avatar.svelte';

    interface Props {
        ticket: TicketDetail;
        onSelect?: (ticket: TicketDetail) => void;
    }

    let { ticket, onSelect }: Props = $props();
</script>

<div>
    {ticket.name}
    {#if onSelect}
        <button onclick={() => onSelect(ticket)}>Réserver</button>
    {/if}
    {ticket.priceIsVariable ? 'Prix variable' : `${ticket.price} €`}
    Ouverture : {ticket.opensAt ? formatISODateToLocale(ticket.opensAt) : 'N/A'}
    Fermeture : {ticket.closesAt ? formatISODateToLocale(ticket.closesAt) : 'N/A'}
    {ticket.showCapacity ? `Capacité : ${ticket.capacity}` : ''}
    {ticket.showPlacesLeft ? `Restant : ${ticket.placesLeft}` : ''}
    {ticket.invited ? ' (Invité)' : ''}
    {#each ticket.openToGroups as group}
        <Avatar avatar={group} />
    {/each}
    {#each ticket.openToMajors as major}
        <Avatar avatar={major} />
    {/each}
    {#each ticket.openToSchools as school}
        <Avatar avatar={school} />
    {/each}
</div>
