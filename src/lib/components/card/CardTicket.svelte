<script lang="ts">
    import type { Ticket } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';

    interface Props {
        ticket: Ticket;
    }

    let { ticket }: Props = $props();
</script>

<div>
    {ticket.name}
    {ticket.priceIsVariable ? 'Prix variable' : `${ticket.price} €`}
    Ouverture : {ticket.opensAt ? formatISODateToLocale(ticket.opensAt) : 'N/A'}
    Fermeture : {ticket.closesAt ? formatISODateToLocale(ticket.closesAt) : 'N/A'}
</div>
