import { graphql } from '#lib/api/graphql/graphql.ts';
import { UserAvatarFragment } from './userAvatar';

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
