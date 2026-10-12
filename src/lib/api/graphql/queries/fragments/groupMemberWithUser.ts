import { graphql } from '#lib/api/graphql/graphql.ts';
import { UserAvatarFragment } from './userAvatar';

/**
 * Graphql fragment to represent a group member with their user avatar.
 */
export const GroupMemberWithUserFragment = graphql(
    `
        fragment GroupMemberUser on GroupMember {
            title
            treasurer
            secretary
            vicePresident
            president
            user {
                ...UserAvatar
            }
        }
    `,
    [UserAvatarFragment]
);
