import { graphql } from '$lib/api/graphql/graphql';

/**
 * Graphql fragment to represent a student association for the Avatar component.
 */
export const StudentAssociationAvatar = graphql(`
    fragment StudentAssociationAvatar on StudentAssociation {
        name
        uid
        pictureURL
    }
`);
