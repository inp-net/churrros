<script lang="ts">
	import type { Ticket } from '$lib/api';
	import { formatISODateToLocale } from '$lib/utils/locale';

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
