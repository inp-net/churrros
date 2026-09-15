import { graphql } from '$lib/api/graphql/graphql';
import { CardBookingFragment } from '../fragments/cardBooking';
import { LightEventFragment } from '../fragments/lightEvent';
import { PageInfoFragment } from '../fragments/pagination';
import { QrCodeFragment } from '../fragments/qrcode';
import { UserAvatarFragment } from '../fragments/userAvatar';

export const GetMyBookings = graphql(`
    query GetMyBookings($first: Int, $after: String) {
        me {
            bookings(first: $first, after:$after) {
            edges {
                node {
                    ...CardBooking
                }
            }
            pageInfo {
                ...PageInfo
            }
        }
        }
    }
`, [PageInfoFragment, CardBookingFragment]);

export const GetBookingByCode = graphql(`
    query PageBooking($code: String!, $qrCodeURLTemplate: URL!) {
        booking(code: $code) {
            code
            beneficiaryUser {
                ...UserAvatar
            }
            author {
                ...UserAvatar
            }
            externalBeneficiary
            paymentMethod
            canManage
            paid
            cancelled
            opposed
            verified
            awaitingPayment
            pendingPayment
            createdAt
            wantsToPay
            qrCode(url: $qrCodeURLTemplate) {
                ...QrCode
            }
            linkURLs
            linkNames
            ticket {
                name
                actualMinimumPrice: minimumPrice(applyPromotions: true)
                minimumPrice(applyPromotions: false)
                maximumPrice
                priceIsVariable
                allowedPaymentMethods
                event {
                    ...LightEvent
                }
            }
        }
    }
`, [LightEventFragment, UserAvatarFragment, QrCodeFragment]);

export const CancelBooking = graphql(`
    mutation CancelBooking($code: String!) {
        cancelBooking(code : $code) {
            ... on MutationCancelBookingSuccess {
                data {
                    cancelledAt
                }
            }
            ... on Error {
                message
            }
        }
    }
`);

export const GetGoogleWalletPass = graphql(`
    mutation GetGoogleWalletPass($code: String!) {
        createGoogleWalletPass(code: $code) {
            __typename
            ... on MutationCreateGoogleWalletPassSuccess {
                data
            }
            ... on Error {
                message
            }
        }
    }
`);

export const GetAppleWalletPass = graphql(`
    mutation GetAppleWalletPass($code: String!) {
        createAppleWalletPass(code: $code) {
            __typename
            ... on MutationCreateAppleWalletPassSuccess {
                data
            }
            ... on Error {
                message
            }
        }
    }
`);