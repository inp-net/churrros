import { graphql } from '#lib/api/graphql/graphql.ts';

export const UserAvatarFragment = graphql(`
    fragment UserAvatar on User {
        fullName
        uid
        pictureURL
    }
`);
