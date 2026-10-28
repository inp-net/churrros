import { graphql } from '#lib/api/graphql/graphql.ts';

import { GroupAvatarFragment } from './groupAvatar';

export const LightEventFragment = graphql(
    `
        fragment LightEvent on Event {
            localID
            title
            organizer {
                ...GroupAvatar
            }
            startsAt
            endsAt
            location
        }
    `,
    [GroupAvatarFragment],
);
