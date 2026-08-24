import { graphql } from '$lib/api/graphql/graphql';
import { UserAvatarFragment } from './userAvatar';

export const CardBookingFragment = graphql(`
    fragment CardBooking on Registration {
        localID
        code
        author {
            ...UserAvatar
        }
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
`, [UserAvatarFragment]);