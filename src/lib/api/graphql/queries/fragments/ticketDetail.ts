import { graphql } from '#lib/api/graphql/graphql.ts';
import { CardTicketFragment } from './cardTicket';
import { GroupAvatarFragment } from './groupAvatar';
import { MajorAvatarFragment } from './majorAvatar';
import { SchoolAvatarFragment } from './schoolAvatar';

export const TicketDetailFragment = graphql(
    `
        fragment TicketDetail on Ticket {
            ...CardTicket
            capacity
            placesLeft
            invited
            openToGroups {
                ...GroupAvatar
            }
            openToMajors(smart: true) {
                ...MajorAvatar
            }
            openToSchools {
                ...SchoolAvatar
            }
            event {
                showCapacity
                showPlacesLeft
            }
        }
    `,
    [GroupAvatarFragment, CardTicketFragment, MajorAvatarFragment, SchoolAvatarFragment]
);
