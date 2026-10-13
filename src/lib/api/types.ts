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

export type LightEvent = Pick<
    Event,
    'id' | 'organizer' | 'title' | 'startsAt' | 'endsAt' | 'location'
>;

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
    paymentPhone: string | null;
    pictureURL: string;
    admin: boolean;
};

export type UserInfos = {
    address: string | null;
    nickname: string;
    birthday: string | null;
    phone: string | null;
    email: string;
    otherEmails: string[];
    contributesTo: Avatar[] | null;
};

export type UserGroups = {
    groups: GroupMember[];
};

export type UserFamily = {
    uid: string;
    nesting: string;
    users: Avatar[];
};

export type UserProfile = {
    uid: string;
    fullName: string;
    name: string;
    pictureURL: string;
    pronouns: string;
    nickname: string;
    description: string;
    yearTier: number;
    major: Avatar | null;
    school: Avatar[];
    links: Link[];
    bot: boolean;
    admin: boolean;
};
//#endregion

//#region Groups
export type GroupMember = {
    avatar: Avatar; //Either the avatar of the user or the avatar of the group
    title: string;
    treasurer: boolean;
    secretary: boolean;
    vicePresident: boolean;
    president: boolean;
};

export type GroupMemberByDate = GroupMember & {
    createdAt: string;
};

export type GroupType =
    'Association' | 'Club' | 'Group' | 'Integration' | 'List' | 'StudentAssociationSection';

export type GroupProfile = {
    group: Avatar;
    email: string | null;
    type: GroupType;
    description: string;
    links: Link[];
    membersCount: number;
    activeMembersCount: number;
    studentAssociation: Avatar;
    selfJoinable: boolean;
};

export type GroupInfos = {
    roomIsOpen: boolean;
    address: string;
    color: string | null;
    email: string | null;
};

export type GroupBoardMembers = {
    membersCount: number;
    boardMembers: GroupMember[];
};

export type GroupAvatar = Avatar & {
    description: string;
};

export type GroupSeeAlso = {
    familyChildren: GroupAvatar[];
    related: GroupAvatar[];
};
//#endregion

//#region Pagination
/**
 * Parameters for a paginated request.
 * First is the number of items to retrieve.
 * After is the cursor from which to retrieve the items. (If null, we retrieve the items from the beginning)
 */
export type PageRequest = {
    first: number;
    after: string | null;
};

/**
 * Result of a paginated request.
 * Items are the requested items.
 * pageInfo contains the pagination information.
 */
export type Page<T> = {
    items: T[];
    pageInfo: PageInfo;
};

/**
 * Pagination information for a paginated request.
 * hasNextPage is a boolean indicating whether there are more items to retrieve.
 * endCursor is the cursor of the last item retrieved, or null if there are no more items to retrieve.
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

export type Searchable = 'Events' | 'Groups' | 'Users';

export type SearchResult = {
    id: string;
    type: Searchable;
    rank: number | null;
    similarity: number;
    content: Event | Avatar;
};

export type PaymentMethod =
    'Card' | 'Cash' | 'Check' | 'External' | 'Lydia' | 'Other' | 'PayPal' | 'Transfer';

export type WalletTarget = 'Apple' | 'Google';

//#endregion

//#region Bookings
export type BookingStatus = 'Opposed' | 'Verified' | 'Cancelled' | 'Paid' | 'Waiting';

export type Booking = {
    id: string;
    code: string;
    status: BookingStatus;
    ticket: Pick<Ticket, 'name'> & {
        event: Pick<Event, 'pictureURL' | 'title'>;
    };
};

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
    };
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
};

//#endregion

//#region Services
export type CardService = {
    id: string;
    name: string;
    url: string;
    description: string;
    logo: string;
    pinned: boolean;
};

//#endregion

//#region Student Association
export type StudentAssociationProfile = {
    studentAssociation: Avatar;
    email: string | null;
    description: string;
    activeMembersCount: number;
    membersCount: number;
    links: Link[];
    school: Avatar;
};

//#endregion

//#region School

export type SchoolProfile = {
    school: Avatar;
    activeStudentsCount: number;
    studentsCount: number;
    description: string;
};

export type SchoolInfos = {
    address: string;
    studentAssociations: Avatar[];
};

export type MajorInfos = {
    avatar: Avatar;
    discontinued: boolean;
    fullName: string;
};

//#endregion
