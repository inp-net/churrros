import { graphql } from '#lib/api/graphql/graphql.ts';
import { CardBookingFragment } from '../fragments/cardBooking';
import { LightEventFragment } from '../fragments/lightEvent';
import { MutationErrorsFragment } from '../fragments/mutationErrors';
import { PageInfoFragment } from '../fragments/pagination';
import { UserAvatarFragment } from '../fragments/userAvatar';

export const GetMyBookings = graphql(
    `
        query GetMyBookings($first: Int, $after: String) {
            me {
                bookings(first: $first, after: $after) {
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
    `,
    [PageInfoFragment, CardBookingFragment]
);

export const GetBookingByCode = graphql(
    `
        query PageBooking($code: String!) {
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
    `,
    [LightEventFragment, UserAvatarFragment]
);

export const CancelBooking = graphql(
    `
        mutation CancelBooking($code: String!) {
            cancelBooking(code: $code) {
                ...MutationErrors
                ... on MutationCancelBookingSuccess {
                    __typename
                    data {
                        cancelledAt
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment]
);

export const GetGoogleWalletPass = graphql(
    `
        mutation GetGoogleWalletPass($code: String!) {
            createGoogleWalletPass(code: $code) {
                ...MutationErrors
                ... on MutationCreateGoogleWalletPassSuccess {
                    __typename
                    data
                }
            }
        }
    `,
    [MutationErrorsFragment]
);

export const GetAppleWalletPass = graphql(
    `
        mutation GetAppleWalletPass($code: String!) {
            createAppleWalletPass(code: $code) {
                ...MutationErrors
                ... on MutationCreateAppleWalletPassSuccess {
                    __typename
                    data
                }
            }
        }
    `,
    [MutationErrorsFragment]
);

export const PayBooking = graphql(
    `
        mutation PayBooking(
            $code: String!
            $paymentMethod: PaymentMethod!
            $phone: String
            $callbackUrl: String!
            $amount: Float!
        ) {
            payBooking(
                code: $code
                paymentMethod: $paymentMethod
                phone: $phone
                paidCallback: $callbackUrl
                amount: $amount
            ) {
                ...MutationErrors
                ... on MutationPayBookingSuccess {
                    __typename
                    data {
                        pendingPayment
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment]
);
