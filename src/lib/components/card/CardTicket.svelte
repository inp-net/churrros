<script lang="ts">
	import type { Ticket } from '$lib/api';

	interface Props {
		ticket: Ticket;
	}

	let { ticket }: Props = $props();
</script>

<div>
	{ticket.name}
	{ticket.priceIsVariable ? 'Prix variable' : `${ticket.price} €`}
	Ouverture : {ticket.opensAt?.toLocaleString() ?? 'N/A'}
	Fermeture : {ticket.closesAt?.toLocaleString() ?? 'N/A'}
</div>
