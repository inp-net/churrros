<script lang="ts">
    import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
    import { eventRepository, type TicketDetail } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import { page } from '$app/state';
    import CardTicketDetail from '#lib/components/card/CardTicketDetail.svelte';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import BookEventModal from '#lib/components/modal/BookEventModal.svelte';
    import { goto } from '$app/navigation';
    import { showToast } from '#lib/utils/toast.ts';

    const queryClient = useQueryClient();

    const query = createQuery(() => ({
        queryKey: ['event', page.params.id],
        queryFn: () => eventRepository.getEventById(page.params.id)
    }));

    const bookingMutation = createMutation(() => ({
        mutationFn: ({
            ticketId,
            churrosBeneficiary,
            beneficiary
        }: {
            ticketId: string;
            churrosBeneficiary?: string;
            beneficiary?: string;
        }) => eventRepository.bookEvent(ticketId, beneficiary, churrosBeneficiary),

        onSuccess: (data) => {
            showToast(m['booking.toast.success'](), 'success', true);
            openBookEventModal = false;
            // The number of bookings has changed, so we need to invalidate the query
            queryClient.invalidateQueries({ queryKey: ['event', page.params.id] });
            goto(`/bookings/${data}`); // Redirect to the booking page after a successful booking
        },
        onError: (error) => {
            showToast(m['booking.toast.failed'](), 'danger', true);
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
        // No need to wait for the mutation, as the handlers onSuccess and onError will handle the next steps.
    }
</script>

<h1>{m['events']()}</h1>

<div>
    {#if query.isPending}
        <p>{m['loading']()}</p>
    {:else if query.isError}
        <!--Si l'event n'existe pas on est dans une erreur-->
        <p>Error: {query.error.message}</p>
    {:else if query.isSuccess}
        {query.data.title} <br />
        {query.data.location} <br />
        {query.data.startsAt ? formatISODateToLocale(query.data.startsAt) : 'N/A'} <br />
        {query.data.endsAt ? formatISODateToLocale(query.data.endsAt) : 'N/A'} <br />
        {query.data.frequency} <br />
        {query.data.recurringUntil ? formatISODateToLocale(query.data.recurringUntil) : 'N/A'}
        <br />
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
