<script lang="ts">
	import type { TicketDetail } from '$lib/api';
	import GroupAvatar from '../avatar/GroupAvatar.svelte';
	import MajorAvatar from '../avatar/MajorAvatar.svelte';
	import SchoolAvatar from '../avatar/SchoolAvatar.svelte';

	interface Props {
		ticket: TicketDetail;
	}

	let { ticket }: Props = $props();
</script>

<div>
	{ticket.name}
	{ticket.priceIsVariable ? 'Prix variable' : `${ticket.price} €`}
	Ouverture : {ticket.opensAt?.toLocaleString() ?? 'N/A'}
	Fermeture : {ticket.closesAt?.toLocaleString() ?? 'N/A'}
	{ticket.showCapacity ? `Capacité : ${ticket.capacity}` : ''}
	{ticket.showPlacesLeft ? `Restant : ${ticket.placesLeft}` : ''}
	{ticket.invited ? ' (Invité)' : ''}
	{#each ticket.openToGroups as group}
		<GroupAvatar groupInfo={group} />
	{/each}
	{#each ticket.openToMajors as major}
		<MajorAvatar {major} />
	{/each}
	{#each ticket.openToSchools as school}
		<SchoolAvatar {school} />
	{/each}
</div>
