<script lang="ts">
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { eventRepository, type TicketDetail } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import CardTicketDetail from '$lib/components/card/CardTicketDetail.svelte';
	import { formatISODateToLocale } from '$lib/utils/dates';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import BookEventModal from '$lib/components/modal/BookEventModal.svelte';
	import { goto } from '$app/navigation';

	const queryClient = useQueryClient();

	const query = createQuery(() => ({
		queryKey: ['event', page.params.id],
		queryFn: () => eventRepository.getEventById(page.params.id)
	}));

	//Gestion null ? Si l'event est a null alors 404

	const bookingMutation = createMutation(() => ({
		//Je met pas de clé de cache car pas besoin nan ?
		mutationFn: ({
			ticketId,
			churrosBeneficiary,
			beneficiary
		}: {
			ticketId: string;
			churrosBeneficiary?: string;
			beneficiary?: string;
		}) =>
			eventRepository.bookEvent(
				`${page.url.origin}/bookings/[code]`,
				ticketId,
				beneficiary,
				churrosBeneficiary
			),

		onSuccess: (data) => {
			console.log('Booking successful:', data);
			openBookEventModal = false;
			//On invalidate car le nombre de place à changé
			queryClient.invalidateQueries({ queryKey: ['event', page.params.id] });
			goto(`/bookings/${data}`); // Redirige vers la page de la reservation car on renvoie l'id de reservation
		},
		onError: (error) => {
			console.error('Booking failed:', error);
			//TODO afficher une erreur à l'utilisateur
		}
	}));

	let openBookEventModal = $state(false);
	let selectedTicket = $state<TicketDetail | null>(null);

	function handleSelectTicket(ticket: TicketDetail) {
		selectedTicket = ticket;
		openBookEventModal = true;
	}

	function handleBooking(ticketId: string, churrosBeneficiary?: string, beneficiary?: string) {
		console.log('Booking ticket:', ticketId, churrosBeneficiary, beneficiary);
		bookingMutation.mutateAsync({ ticketId, churrosBeneficiary, beneficiary });
		//Pas besoin d'attendre car y a onSuccess et onError qui gèrent la suite
	}
</script>

<h1>{m.events()}</h1>

<div>
	{#if query.isPending}
		<p>{m.loading()}</p>
	{:else if query.isError}
		<p>Error: {query.error.message}</p>
	{:else if query.isSuccess && query.data}
		{query.data?.title} <br />
		{query.data.location} <br />
		{query.data.startsAt ? formatISODateToLocale(query.data.startsAt) : 'N/A'} <br />
		{query.data.endsAt ? formatISODateToLocale(query.data.endsAt) : 'N/A'} <br />
		{query.data.frequency} <br />
		{query.data.recurringUntil ? formatISODateToLocale(query.data.recurringUntil) : 'N/A'} <br />
		{query.data.externalTicketing} <br />
		<p>
			{query.data.description}
		</p>

		<Avatar avatar={query.data?.organizer} />
		{#each query.data.coOrganizers as coOrganizer (coOrganizer.uid)}
			<Avatar avatar={coOrganizer} />
		{/each}
		Tickets :
		{#each query.data.tickets as ticket (ticket.id)}
			<CardTicketDetail {ticket} onSelect={handleSelectTicket} />
		{/each}
	{/if}
</div>

<BookEventModal bind:open={openBookEventModal} ticket={selectedTicket!} onBook={handleBooking} />
