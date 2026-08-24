import { graphql } from '$lib/api/graphql/graphql';
import { CardBookingFragment } from '../fragments/cardBooking';
import { PageInfoFragment } from '../fragments/pagination';

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