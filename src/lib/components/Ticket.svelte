<script lang="ts">
	import type { Ticket } from '$lib/api';

	interface Props {
		ticketInfo: Ticket;
	}

	let { ticketInfo }: Props = $props();
</script>

<div>
	{ticketInfo.id}
</div>
