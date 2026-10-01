//#region Auth
export type SessionToken = {
    token: string;
    expiresAt: Date;
};
//#endregion

//#region Events
export type Event = {
    id: string;
    pictureURL: string;
    title: string;
    descriptionPreview: string;
    organizer: Avatar;
    coOrganizers: Avatar[];
    startsAt: string | null;
    endsAt: string | null;
    location: string;
    tickets: Ticket[];
};

export type EventsByDay = {
    date: string;
    shotgunning: Event[];
    happening: Event[];
};

export type EventDetail = {
    title: string;
    location: string;
    description: string;
    descriptionHtml: string;
    startsAt: string | null;
    endsAt: string | null;
    frequency: string | null;
    recurringUntil: string | null;
    externalTicketing: string | null;
    tickets: TicketDetail[];
    organizer: Avatar;
    coOrganizers: Avatar[];
};

export type Ticket = {
    id: string;
    opensAt: string | null;
    closesAt: string | null;
    name: string;
    price: number;
    priceIsVariable: boolean;
};

export type TicketDetail = Ticket & {
    placesLeft: number | 'Unlimited' | null;
    showPlacesLeft: boolean;
    capacity: number | 'Unlimited' | null;
    showCapacity: boolean;
    invited: boolean;
    openToGroups: Avatar[];
    openToMajors: Avatar[];
    openToSchools: Avatar[];
};
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
};

export type UserInfos = {
    uid: string;
    address: string | null;
    nickname: string;
    birthday: string | null;
    phone: string | null;
    email: string;
    otherEmails: string[];
    contributesTo: Avatar[] | null;
}

export type UserGroups = {
    uid: string;
    groups: GroupMember[];
}

export type UserFamily = {
    uid: string;
    nesting: string;
    users: Avatar[];
}

export type UserProfile = {
    name: string;
    pronouns: string;
    nickname: string;
    description: string;
    yearTier: string;
    major: Avatar;
    school: Avatar[]; //PK ?????
    links: Link
}
//#endregion

//#region Groups
export type GroupMember = {
    title: string;
    treasurer: boolean;
    secretary: boolean;
    vicePresident: boolean;
    president: boolean;
    group: Avatar;
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
};

/**
 * Resultat d'une requête paginée.
 * items c'est les éléments récupérés.
 * pageInfo c'est les informations de pagination (hasNextPage et endCursor)
 */
export type Page<T> = {
    items: T[];
    pageInfo: PageInfo;
};

/**
 * Informations de pagination.
 * hasNextPage c'est un booléen qui indique s'il y a une page suivante.
 * endCursor c'est le curseur de la dernière page récupérée.
 */
export type PageInfo = {
    hasNextPage: boolean;
    endCursor: string | null;
};
//#endregion

//#region Utils
export type Avatar = {
    name: string;
    uid: string;
    pictureURL: string;
};

export type Link = {
    url: string | null;
    text: string;
};

//#endregion

//#region Articles

export type Article = {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    pictureURL: string;
    links: Link[];
    group: Avatar;
};

export type ArticleDetail = Article & {
    event: Event | null;
}

//#endregion