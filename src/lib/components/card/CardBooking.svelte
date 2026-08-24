<script lang="ts">
	import { type Booking, BookingStatus } from '$lib/api';
	import { m } from '$lib/paraglide/messages';

	interface Props {
		/**
		 * La réservation à afficher sur la carte
		 */
		booking: Booking;
	}

	let { booking }: Props = $props();

	function getStatusString(status: BookingStatus): string {
		switch (status) {
			case BookingStatus.OPPOSED:
				return m['booking.status.cancelled']();
			case BookingStatus.VERIFIED:
				return m['booking.status.verified']();
			case BookingStatus.CANCELLED:
				return m['booking.status.cancelled']();
			case BookingStatus.PAID:
				return m['booking.status.paid']();
			case BookingStatus.WAITING:
				return m['booking.status.waiting']();
		}
	}
</script>

<a href={`/bookings/${booking.code}`}>
	{booking.ticket.name}

	{booking.ticket.event.title}
	<img src={booking.ticket.event.pictureURL} alt="ouais" />
	{getStatusString(booking.status)}
</a>
