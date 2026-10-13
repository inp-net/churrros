import { graphql } from '#lib/api/graphql/graphql.ts';

export const GroupAvatarFragment = graphql(`
    fragment GroupAvatar on Group {
        name
        uid
        pictureURL
    }
`);
