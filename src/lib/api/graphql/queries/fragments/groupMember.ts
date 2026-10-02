import { graphql } from '$lib/api/graphql/graphql';
import { GroupAvatarFragment } from './groupAvatar';

/**
 * Graphql fragment to represent a group member.
 */
export const GroupMemberFragment = graphql(
    `
        fragment GroupMember on GroupMember {
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
