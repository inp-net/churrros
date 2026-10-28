import type { $tada } from 'gql.tada';

import { ApiValidationError } from '#lib/api/errors.ts';
import { type ResultOf, readFragment } from '#lib/api/graphql/graphql.ts';
import type {
    GetAppleWalletPass,
    GetBookingByCode,
    GetGoogleWalletPass,
    GetMyBookings,
    PayBooking,
} from '#lib/api/graphql/queries/booking/index.ts';
import { CardBookingFragment } from '#lib/api/graphql/queries/fragments/cardBooking.ts';
import { PageInfoFragment } from '#lib/api/graphql/queries/fragments/pagination.ts';
import type { Booking, BookingDetail, BookingStatus, Page, PaymentMethod } from '#lib/api/index.ts';

import { MutationErrorsFragment } from '../../queries/fragments/mutationErrors';
import { mapLightEvent } from '../event';
import { mapUserAvatar } from '../user';

export function mapBookings(
    bookings: NonNullable<ResultOf<typeof GetMyBookings>['me']>['bookings'],
): Page<Booking> {
    const pageInfo = readFragment(PageInfoFragment, bookings.pageInfo);
    return {
        items: bookings.edges.map((edge) => mapBooking(edge.node)),
        pageInfo,
    };
}

interface CardBookingFragmentType {
    [$tada.fragmentRefs]: {
        CardBooking: 'Registration';
    };
}

function mapBooking(booking: CardBookingFragmentType): Booking {
    const data = readFragment(CardBookingFragment, booking);
    return {
        code: data.code,
        id: data.localID,
        status: mapBookingStatus(data.opposed, data.verified, data.cancelled, data.paid),
        ticket: data.ticket,
    };
}

function mapBookingStatus(
    opposed: boolean,
    verified: boolean,
    cancelled: boolean,
    paid: boolean,
): BookingStatus {
    // In the API we have multiple booleans for the status, but in the front we only display the last state
    if (opposed) {
        return 'Opposed';
    }
    if (verified) {
        return 'Verified';
    }
    if (cancelled) {
        return 'Cancelled';
    }
    if (paid) {
        return 'Paid';
    }
    // Fallback just in case
    return 'Waiting';
}

export function mapBookingDetail(
    booking: ResultOf<typeof GetBookingByCode>['booking'],
): BookingDetail {
    return {
        author: booking.author ? mapUserAvatar(booking.author) : null,
        awaitingPayment: booking.awaitingPayment,
        beneficiaryUser: booking.beneficiaryUser ? mapUserAvatar(booking.beneficiaryUser) : null,
        canManage: booking.canManage,
        cancelled: booking.cancelled,
        code: booking.code,
        createdAt: booking.createdAt,
        externalBeneficiary: booking.externalBeneficiary,
        linkNames: booking.linkNames,
        linkURLs: booking.linkURLs,
        opposed: booking.opposed,
        paid: booking.paid,
        paymentMethod: booking.paymentMethod,
        pendingPayment: booking.pendingPayment,
        ticket: {
            actualMinimumPrice: booking.ticket.actualMinimumPrice,
            allowedPaymentMethods: booking.ticket.allowedPaymentMethods,
            event: mapLightEvent(booking.ticket.event),
            maximumPrice: booking.ticket.maximumPrice,
            minimumPrice: booking.ticket.minimumPrice,
            name: booking.ticket.name,
            priceIsVariable: booking.ticket.priceIsVariable,
        },
        verified: booking.verified,
        wantsToPay: booking.wantsToPay,
    };
}

export function mapGoogleWalletPass(
    result: ResultOf<typeof GetGoogleWalletPass>['createGoogleWalletPass'],
): string {
    if (!result) {
        throw new Error('No google wallet pass data found');
    }
    switch (result.__typename) {
        case 'Error': {
            const errorsFragment = readFragment(MutationErrorsFragment, result);
            throw new Error(errorsFragment.message);
        }
        case 'MutationCreateGoogleWalletPassSuccess': {
            return result.data;
        }
        default: {
            // ZodErrors are ignored as the user doesn't interact with the parameters
            throw new Error('Unhandled google wallet pass data found');
        }
    }
}

export const mapAppleWalletPass = (
    result: ResultOf<typeof GetAppleWalletPass>['createAppleWalletPass'],
): string => {
    if (!result.__typename) {
        throw new Error('No apple wallet pass data found');
    }

    switch (result.__typename) {
        case 'Error': {
            const errorsFragment = readFragment(MutationErrorsFragment, result);
            throw new Error(errorsFragment.message);
        }
        case 'MutationCreateAppleWalletPassSuccess': {
            return result.data;
        }
        default: {
            // ZodErrors are ignored as the user doesn't interact with the parameters
            throw new Error('Unhandled apple wallet pass data found');
        }
    }
};

export function mapPayBooking(result: ResultOf<typeof PayBooking>['payBooking']): void {
    switch (result.__typename) {
        case 'MutationPayBookingSuccess': {
            return;
        }
        case 'Error': {
            const errorsFragment = readFragment(MutationErrorsFragment, result);
            throw new Error(errorsFragment.message);
        }
        case 'ZodError': {
            const zodErrorsFragment = readFragment(MutationErrorsFragment, result);
            throw new ApiValidationError(zodErrorsFragment.fieldErrors);
        }
        case undefined:
        default: {
            throw new Error('Unhandled pay booking result');
        }
    }
}
