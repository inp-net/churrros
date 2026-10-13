import { graphql } from '#lib/api/graphql/graphql.ts';

export const SchoolAvatarFragment = graphql(`
    fragment SchoolAvatar on School {
        name
        uid
        pictureURL
    }
`);
