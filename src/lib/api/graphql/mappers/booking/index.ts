import { BookingStatus, type Booking, type BookingDetail, type Page, type QrCode } from "$lib/api";
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import { GetAppleWalletPass, GetBookingByCode, GetGoogleWalletPass, GetMyBookings } from "$lib/api/graphql/queries/booking";
import { PageInfoFragment } from "$lib/api/graphql/queries/fragments/pagination";
import type { $tada } from "gql.tada";
import { CardBookingFragment } from "$lib/api/graphql/queries/fragments/cardBooking";
import { mapUserAvatar } from "../user";
import { QrCodeFragment } from "../../queries/fragments/qrcode";
import { mapLightEvent } from "../event";

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
    return BookingStatus.WAITING;
}

type QRCodeFragmentType = {
    [$tada.fragmentRefs]: {
        QrCode: "QRCode";
    };
}

export function mapQRCode(fragment: QRCodeFragmentType): QrCode {
    const data = readFragment(QrCodeFragment, fragment);
    return {
        path: data.path,
        viewbox: data.viewbox
    };
}

export function mapBookingDetail(booking: ResultOf<typeof GetBookingByCode>["booking"]): BookingDetail {
    return {
        code: booking.code,
        author: booking.author ? mapUserAvatar(booking.author) : null,
        beneficiaryUser: booking.beneficiaryUser ? mapUserAvatar(booking.beneficiaryUser) : null,
        externalBeneficiary: booking.externalBeneficiary,
        paymentMethod: booking.paymentMethod,
        canManage: booking.canManage,
        paid: booking.paid,
        cancelled: booking.cancelled,
        opposed: booking.opposed,
        verified: booking.verified,
        awaitingPayment: booking.awaitingPayment,
        pendingPayment: booking.pendingPayment,
        createdAt: booking.createdAt,
        wantsToPay: booking.wantsToPay,
        qrCode: mapQRCode(booking.qrCode),
        linkURLs: booking.linkURLs,
        linkNames: booking.linkNames,
        ticket: {
            name: booking.ticket.name,
            actualMinimumPrice: booking.ticket.actualMinimumPrice,
            minimumPrice: booking.ticket.minimumPrice,
            maximumPrice: booking.ticket.maximumPrice,
            priceIsVariable: booking.ticket.priceIsVariable,
            allowedPaymentMethods: booking.ticket.allowedPaymentMethods,
            event: mapLightEvent(booking.ticket.event)
        }
    }
}

export function mapGoogleWalletPass(result: ResultOf<typeof GetGoogleWalletPass>["createGoogleWalletPass"]): string {
    if (!result) {
        throw new Error('No google wallet pass data found');
    }
    switch (result.__typename) {
        case 'Error': {
            throw new Error(result.message);
        }
        case "MutationCreateGoogleWalletPassSuccess": {
            return result.data;
        }
        default:
            throw new Error('Unhandled google wallet pass data found');
    }
}

export function mapAppleWalletPass(result: ResultOf<typeof GetAppleWalletPass>["createAppleWalletPass"]): string {
    if (!result) {
        throw new Error('No apple wallet pass data found');
    }

    switch (result.__typename) {
        case 'Error': {
            throw new Error(result.message);
        }
        case "MutationCreateAppleWalletPassSuccess": {
            return result.data;
        }
        default:
            throw new Error('Unhandled apple wallet pass data found');
    }
}