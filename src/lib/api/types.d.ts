//#region Auth
export type SessionToken = {
    token: string;
    expiresAt: Date;
}
//#endregion

//#region Events
export type Event = {
    id: string;
    slug: string;
    title: string;
    description: string;
    startsAt: Date | null;
    location: string;
    pictureURL: string;
}
//#endregion

//#region Users
export type User = {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    phone: string | null;
    pictureURL: string;
    admin: boolean;
}
//#endregion

//#region Pagination
/**
 * Arguments pour request de la pagination.
 * First c'est le nombre d'éléments à récupérer.
 * After c'est le curseur à partir duquel récupérer les éléments. (Si null, on récupère les éléments depuis le début)
 */
export type PageRequest = {
    first: number;
    after: string | null;
}

/**
 * Resultat d'une requête paginée.
 * items c'est les éléments récupérés.
 * pageInfo c'est les informations de pagination (hasNextPage et endCursor)
 */
export type Page<T> = {
    items: T[];
    pageInfo: PageInfo;
}

/**
 * Informations de pagination.
 * hasNextPage c'est un booléen qui indique s'il y a une page suivante.
 * endCursor c'est le curseur de la dernière page récupérée.
 */
export type PageInfo = {
    hasNextPage: boolean;
    endCursor: string | null;
}
//#endregion