import { GroupAvatarFragment } from './groupAvatar';
import { graphql } from '$lib/api/graphql/graphql';

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
    [GroupAvatarFragment]
);
