<script lang="ts">
	import { type Booking } from '$lib/api';
	import { bookingStatusToLocalizedString } from '$lib/utils/i18n';

	interface Props {
		/**
		 * La réservation à afficher sur la carte
		 */
		booking: Booking;
	}

	let { booking }: Props = $props();
</script>

<a href={`/bookings/${booking.code}`}>
	{booking.ticket.name}

	{booking.ticket.event.title}
	<img src={booking.ticket.event.pictureURL} alt="ouais" />
	{bookingStatusToLocalizedString(booking.status)}
</a>
