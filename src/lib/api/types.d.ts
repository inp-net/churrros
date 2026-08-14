//#region Auth
export type SessionToken = {
    token: string;
    expiresAt: Date;
}
//#endregion

//#region Events
export type Event = {
    id: string;
    pictureURL: string;
    title: string;
    descriptionPreview: string;
    organizer: GroupAvatar;
    coOrganizers: GroupAvatar[];
    startsAt: Date | null;
    endsAt: Date | null;
    location: string;
    tickets: Ticket[];
}

export type EventDetail = {
    title: string;
    location: string;
    description: string;
    descriptionHtml: string;
    startsAt: Date | null;
    endsAt: Date | null;
    frequency: string | null;
    recurringUntil: Date | null;
    externalTicketing: string | null;
    tickets: TicketDetail[];
    organizer: GroupAvatar;
    coOrganizers: GroupAvatar[];
}

export type Ticket = {
    id: string;
    opensAt: Date | null;
    closesAt: Date | null;
    name: string;
    price: number;
    priceIsVariable: boolean;
}

export type TicketDetail = Ticket & {
    placesLeft: number | "Unlimited" | null;
    showPlacesLeft: boolean;
    capacity: number | "Unlimited" | null;
    showCapacity: boolean;
    invited: boolean;
    openToGroups: GroupAvatar[];
    openToMajors: Avatar[];
    openToSchools: Avatar[];
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

//#region Groups
export type GroupAvatar = Avatar & {
    pictureURLDark: string;
}
//#endregion

//#region Utils
export type Avatar = {
    name: string;
    uid: string;
    pictureURL: string;
}

//#endregion

