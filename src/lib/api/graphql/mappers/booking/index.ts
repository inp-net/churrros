import { BookingStatus, type Booking, type Page } from "$lib/api";
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import { GetMyBookings } from "$lib/api/graphql/queries/booking";
import { PageInfoFragment } from "$lib/api/graphql/queries/fragments/pagination";
import type { $tada } from "gql.tada";
import { CardBookingFragment } from "$lib/api/graphql/queries/fragments/cardBooking";
import { mapUserAvatar } from "../user";

export function mapBookings(bookings: NonNullable<ResultOf<typeof GetMyBookings>["me"]>["bookings"]): Page<Booking> {
    const pageInfo = readFragment(PageInfoFragment, bookings.pageInfo);
    return {
        items: bookings.edges.map((edge) => mapBooking(edge.node)),
        pageInfo
    }
}

type CardBookingFragmentType = {
    [$tada.fragmentRefs]: {
        CardBooking: "Registration";
    };
}

function mapBooking(booking: CardBookingFragmentType): Booking {
    const data = readFragment(CardBookingFragment, booking);
    return {
        id: data.localID,
        code: data.code,
        author: data.author ? mapUserAvatar(data.author) : null,
        status: mapBookingStatus(data.opposed, data.verified, data.cancelled, data.paid),
        ticket: data.ticket
    }
}

function mapBookingStatus(
    opposed: boolean,
    verified: boolean,
    cancelled: boolean,
    paid: boolean
): BookingStatus {
    //Dans le back il peut être intéressant de garder les infos des différents états (on peut ne pas avoir payé et annulé)
    //Mais dans le front on affiche que le dernier etat
    if (opposed) {
        return BookingStatus.OPPOSED;
    }
    if (verified) {
        return BookingStatus.VERIFIED;
    }
    if (cancelled) {
        return BookingStatus.CANCELLED;
    }
    if (paid) {
        return BookingStatus.PAID;
    }
    //Fallback obligatoire
    return BookingStatus.WAITING_FOR_PAYMENT;
}