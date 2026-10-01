import { graphql } from '$lib/api/graphql/graphql';

/**
 * Fragment graphql qui permet de récupérer les informations d'une école pour l'afficher dans le composant Avatar.
 */
export const SchoolAvatarFragment = graphql(`
    fragment SchoolAvatar on School {
        name
        uid
        pictureURL
    }
`);
