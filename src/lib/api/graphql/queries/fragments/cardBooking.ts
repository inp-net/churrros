import { graphql } from '$lib/api/graphql/graphql';

export const CardBookingFragment = graphql(`
    fragment CardBooking on Registration {
        localID
        code
        opposed
        verified
        cancelled
        paid
        ticket {
            name
            event {
                pictureURL
                title
            }
        }
    }
`);
