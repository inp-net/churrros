import { graphql } from '$lib/api/graphql/graphql';
import { GroupAvatarFragment } from './groupAvatar';

/**
 * Graphql fragment to represent a group member with their associated group.
 */
export const GroupMemberWithGroupFragment = graphql(
    `
        fragment GroupMemberGroup on GroupMember {
            title
            treasurer
            secretary
            vicePresident
            president
            group {
                ...GroupAvatar
            }
        }
    `,
    [GroupAvatarFragment]
);
