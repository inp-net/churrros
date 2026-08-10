import { graphql } from '$lib/api/graphql/graphql';

export const GroupAvatarFragment = graphql(`
    fragment GroupAvatar on Group {
        name
        uid
        pictureURL
        pictureURLDark: pictureURL(dark: true)
    }   
`);