import { graphql } from '$lib/api/graphql/graphql';
import { CardBookingFragment } from '../fragments/cardBooking';
import { CardEventFragment } from '../fragments/cardEvent';
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
            authorIsBeneficiary
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
                    localID
                    title
                    enforcePointOfContact
                    ...CardEvent
                }
            }
        }
    }
`, [CardEventFragment, UserAvatarFragment, QrCodeFragment]);