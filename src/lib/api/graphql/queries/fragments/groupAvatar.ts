import { graphql } from '$lib/api/graphql/graphql';

/**
 * Fragment graphql qui permet de récupérer les informations d'un groupe pour l'afficher dans le composant GroupAvatar.
 */
export const GroupAvatarFragment = graphql(`
    fragment GroupAvatar on Group {
        name
        uid
        pictureURL
    }
`);
