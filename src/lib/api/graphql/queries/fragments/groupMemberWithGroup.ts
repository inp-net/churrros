import { graphql } from '#lib/api/graphql/graphql.ts';
import { GroupAvatarFragment } from './groupAvatar';

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
