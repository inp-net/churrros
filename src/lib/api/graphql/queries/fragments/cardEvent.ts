import { graphql } from '#lib/api/graphql/graphql.ts';

import { CardTicketFragment } from './cardTicket';
import { GroupAvatarFragment } from './groupAvatar';

export const CardEventFragment = graphql(
    `
        fragment CardEvent on Event {
            localID
            pictureURL
            title
            descriptionPreview
            organizer {
                ...GroupAvatar
            }
            coOrganizers {
                ...GroupAvatar
            }
            startsAt
            endsAt
            frequency
            recurringUntil
            location
            tickets {
                ...CardTicket
            }
        }
    `,
    [GroupAvatarFragment, CardTicketFragment],
);
