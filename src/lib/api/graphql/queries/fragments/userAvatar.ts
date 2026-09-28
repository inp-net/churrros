import { graphql } from '$lib/api/graphql/graphql';

/**
 * Fragment graphql qui permet de récupérer les informations minimale sur un utilisateur pour l'afficher dans le composant Avatar.
 */
export const UserAvatarFragment = graphql(`
    fragment UserAvatar on User {
        fullName
        uid
        pictureURL
    }
`);
