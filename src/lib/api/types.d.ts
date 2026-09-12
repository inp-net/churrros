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
    startsAt: string | null;
    endsAt: string | null;
    location: string;
    tickets: Ticket[];
}

export type LightEvent = Pick<Event, "id" | "organizer" | "title" | "startsAt" | "endsAt" | "location">;

export type EventsByDay = {
    date: string;
    shotgunning: Event[];
    happening: Event[];
}

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
    organizer: GroupAvatar;
    coOrganizers: GroupAvatar[];
}

export type Ticket = {
    id: string;
    opensAt: string | null;
    closesAt: string | null;
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
    paymentPhone: string | null;
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

//#region Utils
export type Avatar = {
    name: string;
    uid: string;
    pictureURL: string;
}

export type QrCode = {
    path: string;
    viewbox: string;
}

//#endregion

//#region Bookings
export type Booking = {
    id: string;
    code: string;
    status: BookingStatus;
    ticket: Pick<Ticket, "name"> & {
        event: Pick<Event, "pictureURL" | "title">
    };
}

export type BookingDetail = {
    code: string;
    beneficiaryUser: Avatar | null;
    author: Avatar | null;
    externalBeneficiary: string | null;
    paymentMethod: PaymentMethod | null;
    canManage: boolean;
    paid: boolean;
    cancelled: boolean;
    opposed: boolean;
    verified: boolean;
    awaitingPayment: boolean;
    pendingPayment: boolean;
    createdAt: string;
    wantsToPay: number | null;
    qrCode: QrCode;
    linkURLs: string[];
    linkNames: string[];
    ticket: {
        name: string;
        actualMinimumPrice: number;
        minimumPrice: number;
        maximumPrice: number;
        priceIsVariable: boolean;
        allowedPaymentMethods: PaymentMethod[];
        event: LightEvent;
    }
}
//#endregion
