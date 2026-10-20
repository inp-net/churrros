import { graphql } from '#lib/api/graphql/graphql.ts';

export const StudentAssociationAvatar = graphql(`
    fragment StudentAssociationAvatar on StudentAssociation {
        name
        uid
        pictureURL
    }
`);
