import { type } from 'arktype';

//#region Auth
export interface SessionToken {
    token: string;
    expiresAt: Date;
}
//#endregion

//#region Events
export interface Event {
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
}

export type LightEvent = Pick<
    Event,
    'id' | 'organizer' | 'title' | 'startsAt' | 'endsAt' | 'location'
>;

export interface EventsByDay {
    date: string;
    shotgunning: Event[];
    happening: Event[];
}

export interface EventDetail {
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
}

export interface Ticket {
    id: string;
    opensAt: string | null;
    closesAt: string | null;
    name: string;
    price: number;
    priceIsVariable: boolean;
}

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
export interface User {
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

export interface UserInfos {
    address: string | null;
    nickname: string;
    birthday: string | null;
    phone: string | null;
    email: string;
    otherEmails: string[];
    contributesTo: Avatar[] | null;
}

export interface UserGroups {
    groups: GroupMember[];
}

export interface UserFamily {
    uid: string;
    nesting: string;
    users: Avatar[];
}

export interface UserProfile {
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
}
//#endregion

//#region Groups
export interface GroupMember {
    avatar: Avatar; // Either the avatar of the user or the avatar of the group
    title: string;
    treasurer: boolean;
    secretary: boolean;
    vicePresident: boolean;
    president: boolean;
}

export type GroupMemberByDate = GroupMember & {
    createdAt: string;
};

// We use arktype here so it can be reused in forms
export const GROUP_TYPES = [
    'Association',
    'Club',
    'Group',
    'Integration',
    'List',
    'StudentAssociationSection',
] as const;

export const GroupType = type.enumerated(...GROUP_TYPES);
export type GroupType = typeof GroupType.infer;

export interface GroupProfile {
    group: Avatar;
    email: string | null;
    type: GroupType;
    description: string;
    links: Link[];
    membersCount: number;
    activeMembersCount: number;
    studentAssociation: Avatar;
    selfJoinable: boolean;
}

export interface GroupInfos {
    roomIsOpen: boolean;
    address: string;
    color: string | null;
    email: string | null;
}

export interface GroupBoardMembers {
    membersCount: number;
    boardMembers: GroupMember[];
}

export type GroupAvatar = Avatar & {
    description: string;
};

export interface GroupSeeAlso {
    familyChildren: GroupAvatar[];
    related: GroupAvatar[];
}

export interface GroupPermissions {
    canEditDetails: boolean;
    canEditJoinPolicy: boolean;
    canEditParent: boolean;
    canEditStudentAssociation: boolean;
    canEditType: boolean;
    canEditUnlisted: boolean;
    canEditLydiaAccounts: boolean;
}

// We use partial here because you only get the parts you are allowed to see
export type GroupEditInfo = Partial<{
    avatar: Avatar;
    shortDescription: string;
    longDescription: string;
    color: string | null;
    email: string | null;
    address: string;
    relatedGroups: Avatar[];

    studentAssociation: Avatar;

    parent: Avatar;

    selfJoinable: boolean;
    type: GroupType;
    unlisted: boolean;
    accounts: {
        id: string;
        name: string;
        eventsCount: number;
    }[];
}>;

//#endregion

//#region Pagination
/**
 * Parameters for a paginated request.
 * First is the number of items to retrieve.
 * After is the cursor from which to retrieve the items. (If null, we retrieve the items from the beginning)
 */
export interface PageRequest {
    first: number;
    after: string | null;
}

/**
 * Result of a paginated request.
 * Items are the requested items.
 * pageInfo contains the pagination information.
 */
export interface Page<T> {
    items: T[];
    pageInfo: PageInfo;
}

/**
 * Pagination information for a paginated request.
 * hasNextPage is a boolean indicating whether there are more items to retrieve.
 * endCursor is the cursor of the last item retrieved, or null if there are no more items to retrieve.
 */
export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string | null;
}
//#endregion

//#region Utils
export interface Avatar {
    name: string;
    uid: string;
    pictureURL: string;
}

export interface Link {
    url: string | null;
    text: string;
}

export type Searchable = 'Events' | 'Groups' | 'Users';

export interface SearchResult {
    id: string;
    type: Searchable;
    rank: number | null;
    similarity: number;
    content: Event | Avatar;
}

export type PaymentMethod =
    | 'Card'
    | 'Cash'
    | 'Check'
    | 'External'
    | 'Lydia'
    | 'Other'
    | 'PayPal'
    | 'Transfer';

export type WalletTarget = 'Apple' | 'Google';

//#endregion

//#region Bookings
export type BookingStatus = 'Opposed' | 'Verified' | 'Cancelled' | 'Paid' | 'Waiting';

export interface Booking {
    id: string;
    code: string;
    status: BookingStatus;
    ticket: Pick<Ticket, 'name'> & {
        event: Pick<Event, 'pictureURL' | 'title'>;
    };
}

export interface BookingDetail {
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
}
//#endregion

//#region Articles

export interface Article {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    pictureURL: string;
    links: Link[];
    group: Avatar;
}

export type ArticleDetail = Article & {
    event: Event | null;
};

//#endregion

//#region Services
export interface CardService {
    id: string;
    name: string;
    url: string;
    description: string;
    logo: string;
    pinned: boolean;
}

//#endregion

//#region Student Association
export interface StudentAssociationProfile {
    studentAssociation: Avatar;
    email: string | null;
    description: string;
    activeMembersCount: number;
    membersCount: number;
    links: Link[];
    school: Avatar;
}

//#endregion

//#region School

export interface SchoolProfile {
    school: Avatar;
    activeStudentsCount: number;
    studentsCount: number;
    description: string;
}

export interface SchoolInfos {
    address: string;
    studentAssociations: Avatar[];
}

export interface MajorInfos {
    avatar: Avatar;
    discontinued: boolean;
    fullName: string;
}

//#endregion
