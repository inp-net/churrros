import { graphql } from '$lib/api/graphql/graphql';

/**
 * Fragment graphql qui permet de récupérer les informations d'une filière pour l'afficher dans le composant MajorAvatar.
 */
export const MajorAvatarFragment = graphql(`
    fragment MajorAvatar on Major {
        name
        uid
        pictureURL
    }   
`);