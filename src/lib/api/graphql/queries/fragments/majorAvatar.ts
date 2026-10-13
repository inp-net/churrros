import { graphql } from '#lib/api/graphql/graphql.ts';

export const MajorAvatarFragment = graphql(`
    fragment MajorAvatar on Major {
        name
        uid
        pictureURL
    }
`);
