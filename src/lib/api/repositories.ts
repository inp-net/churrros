import type {
    PageRequest,
    Page,
    EventDetail,
    Avatar,
    UserInfos,
    UserGroups,
    UserFamily,
    Article,
    ArticleDetail,
    EventsByDay,
    Searchable,
    SearchResult,
    UserProfile,
    StudentAssociationProfile,
    GroupType,
    MajorInfos,
    SchoolInfos,
    SchoolProfile,
    SessionToken,
    User,
    GroupProfile,
    GroupInfos,
    GroupBoardMembers,
    GroupSeeAlso,
    GroupMemberByDate,
    GroupAvatar,
    CardService,
    GroupPermissions,
    Booking,
    BookingDetail,
    PaymentMethod
} from '#lib/api/index.ts';
import type { UpdateGroupInput, UpdateGroupPatch } from '#lib/forms/group/group.schema.ts';
import type { Cookies } from '@sveltejs/kit';

export interface EventRepository {
    /**
     * Fetches a paginated list of events.
     * @param args the pagination information, first for the number of elements to retrieve, after for the cursor of the previous page (if null, we retrieve the elements from the beginning)
     * @returns a page of events with the pagination information
     */
    getEvents(args: PageRequest): Promise<Page<EventsByDay>>;

    /**
     * Fetches the details of an event by its ID.
     * @param id the ID of the event to retrieve
     * @returns the details of the event
     * @throws an error if the event does not exist
     */
    getEventById(id: string | undefined): Promise<EventDetail>;

    /**
     * NOT IMPLEMENTED
     */
    createEvent(groupId: string, title: string, createManagerInvite: boolean): Promise<string>;

    /**
     * NOT IMPLEMENTED
     */
    editEvent(): Promise<void>;

    /**
     * NOT IMPLEMENTED
     */
    deleteEvent(): Promise<void>;

    /**
     * Creates a booking for an event with the given parameters.
     * @param ticketId : the id of the ticket to book
     * @param beneficiary : first name and last name of the beneficiary (for external users) (optional)
     * @param churrosBeneficiary : uid of the beneficiary (if different from the current user) (optional)
     */
    bookEvent(ticketId: string, beneficiary?: string, churrosBeneficiary?: string): Promise<string>;
}

export interface AuthRepository {
    /**
     * Fetches a session token for the user with the provided email or uid and password.
     * @param emailOrUid the email or uid of the user to authenticate
     * @param password the password of the user to authenticate
     * @returns a session token for the authenticated user
     * @throws an error if the authentication fails
     */
    login(emailOrUid: string, password: string): Promise<SessionToken>;
}

export interface UserRepository {
    /**
     * Recupère les informations d'un utilisateur par son uid.
     * Fetches the information of a user by their uid.
     * @param uid the uid of the user to retrieve
     * @returns the informations of the user
     * @throws an error if the user does not exist
     */
    getUserByUid(uid: string): Promise<User>;

    /**
     * Fetches the avatar of a user by their uid.
     * @param uid the uid of the user to retrieve
     * @returns the avatar of the user
     * @throws an error if the user does not exist
     */
    getUserAvatarByUid(uid: string): Promise<Avatar>;

    /**
     * Fetches the profile of a user by their uid.
     * @param uid the uid of the user to retrieve
     * @returns the profile of the user
     * @throws an error if the user does not exist
     */
    getUserProfile(uid?: string): Promise<UserProfile>;

    /**
     * Returns the infos of a user by its uid.
     * @param uid the uid of the user to retrieve
     * @returns the infos of the user
     * @throws an error if the user does not exist
     */
    getUserInfos(uid?: string): Promise<UserInfos>;

    /**
     * Returns the groups that a user is a member of by its uid.
     * @param uid the uid of the user to retrieve
     * @returns the groups that the user is a member of
     * @throws an error if the user does not exist
     */
    getUserGroups(uid?: string): Promise<UserGroups>;

    /**
     * Returns the family of a user by its uid.
     * @param uid the uid of the user to retrieve
     * @returns the family of the user
     * @throws an error if the user does not exist
     */
    getUserFamily(uid?: string): Promise<UserFamily>;

    /**
     * Fetches the birthdays of users.
     * Only works when logged in.
     * @param date The date around which to fetch birthdays in ISO format(optionnal)(By default the current date on the server)
     * @param activeOnly True if we want only active users in first, second or third year, false if we want all users
     * @param width The number of days around the date (optionnal) (By default 1 day)
     * @returns A list of avatars of users whose birthday it is
     */
    getBirthdays(activeOnly: boolean, date?: string, width?: number): Promise<Avatar[]>;

    /**
     * Fetches the birthdays of users grouped by date. Only works when logged in.
     * @param activeOnly True if we want only active users in first, second or third year, false if we want all users
     * @param date The date around which to fetch birthdays in ISO format (optionnal) (By default the current date on the server)
     * @param width The number of days around the date (optionnal) (By default 1 day)
     * @returns An record where the keys are the dates in ISO format and the values are the list of avatars of users whose birthday it is on that date
     */
    getGroupedBirthdays(
        activeOnly: boolean,
        date?: string,
        width?: number
    ): Promise<Record<string, Avatar[]>>;
}

export interface MeRepository {
    /**
     * Fetches the information of the currently authenticated user.
     * GraphQL server side request
     * @param event the server event containing the fetch and cookies objects
     * @returns the information of the currently authenticated user, or null if not authenticated
     */
    getMe(event?: { fetch: typeof fetch; cookies: Cookies }): Promise<User | null>;

    /**
     * Fetches the list of groups on which the currently authenticated user can create events
     * @returns an array of avatars of the groups on which the user can create events
     */
    getCanCreateEventsOn(): Promise<Avatar[]>;

    /**
     * Fetches the list of student associations on which the currently authenticated user can create groups
     * @returns an array of avatars of the student associations on which the user can create groups
     */
    getCanCreateGroupsOn(): Promise<Avatar[]>;

    /**
     * Saves the payment phone number of the currently authenticated user.
     * @param phone the phone number to save
     * @returns the saved phone number, or null if the user is not authenticated
     */
    rememberPaymentPhone(phone: string): Promise<string | null>;
}

export interface BookingRepository {
    /**
     * Fetches a paginated list of bookings for the currently authenticated user.
     * @param args the pagination information, first for the number of items to retrieve, after for the cursor of the previous page (if null, we retrieve the items from the beginning)
     * @returns a page of bookings with pagination information
     */
    getMyBookings(args: PageRequest): Promise<Page<Booking>>;

    /**
     * Fetches the details of a booking by its code.
     * @param code the code of the booking to retrieve
     * @returns the booking details if it exists
     * @throws an error if the booking does not exist
     */
    getBookingByCode(code?: string): Promise<BookingDetail>;

    /**
     * Cancels a booking by its code.
     * @param code the code of the booking to cancel
     * @throws an error if the booking does not exist
     */
    cancelBooking(code?: string): Promise<void>;

    /**
     * Fetches the URL for the Google Wallet pass of a booking by its code.
     * @param code the code of the booking to retrieve the Google Wallet pass for
     * @returns the URL of the Google Wallet pass
     * @throws an error if the booking does not exist
     */
    getGoogleWalletPass(code?: string): Promise<string>;

    /**
     * Fetches the URL for the Apple Wallet pass of a booking by its code.
     * @param code the code of the booking to retrieve the Apple Wallet pass for
     * @returns the URL of the Apple Wallet pass
     * @throws an error if the booking does not exist
     */
    getAppleWalletPass(code?: string): Promise<string>;

    /**
     * Handles the payment of a booking by its code with the specified parmaters
     * NOTE : This method is also used to save the payment information which is not ideal, in my opinion we should first save the information to be able to come back later, but we'll see when we tackle the API.
     * @param code the code of the booking to pay
     * @param paymentMethod the payment method to use for the payment
     * @param callbackUrl the URL to call after the payment
     * @param amount the amount to pay
     * @param phone the phone number of the user for the payments (optional, used for certain payment methods)
     */
    payBooking(
        code: string,
        paymentMethod: PaymentMethod,
        callbackUrl: string,
        amount: number,
        phone?: string
    ): Promise<void>;
}

export interface ArticleRepository {
    /**
     * Returns a paginated list of articles.
     * @param args the pagination information, first for the number of items to retrieve, after for the cursor of the previous page (if null, we retrieve the items from the beginning)
     * @returns a page of articles with pagination information
     */
    getArticles(args: PageRequest): Promise<Page<Article>>;

    /**
     * Return the details of an article by its ID.
     * @param id the ID of the article
     * @returns the details of the article
     * @throws an error if the article does not exist
     */
    getArticleById(id: string | undefined): Promise<ArticleDetail>;
}

export interface SearchRepository {
    /**
     * Returns a list of search results based on the query and the types of resources to search for.
     * @param q the search query
     * @param only the types of resources to search for
     * @returns a list of search results
     */
    search(q: string, only: Searchable[]): Promise<SearchResult[]>;
}

export interface GroupRepository {
    /**
     * Returns the profile of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the profile of the group
     * @throws an error if the group does not exist
     */
    getGroupProfile(uid?: string): Promise<GroupProfile>;

    /**
     * Returns the infos of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the infos of the group
     * @throws an error if the group does not exist
     */
    getGroupInfos(uid?: string): Promise<GroupInfos>;

    /**
     * Returns the board members of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the board members of the group
     * @throws an error if the group does not exist
     */
    getGroupBoardMembers(uid?: string): Promise<GroupBoardMembers>;

    /**
     * Returns the "see also" information of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the "see also" information of the group
     * @throws an error if the group does not exist
     */
    getGroupSeeAlso(uid?: string): Promise<GroupSeeAlso>;

    /**
     * Returns a paginated list of members of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @param args the pagination information, first for the number of items to retrieve, after for the cursor of the previous page (if null, we retrieve the items from the beginning)
     * @returns a page of group members with pagination information,
     * @throws an error if the group does not exist
     */
    getGroupMembers(args: PageRequest, uid?: string): Promise<Page<GroupMemberByDate>>;

    /**
     * Creates a new group with the specified parameters.
     * @param studentAssociationId the student association associated with the group
     * @param uid the unique identifier for the group
     * @param name the name of the group
     * @param type the type of the group
     * @returns the uid of the newly created group
     * @throws an error if the group could not be created
     */
    createGroup(
        studentAssociationId: string,
        uid: string,
        name: string,
        type: GroupType
    ): Promise<string>;

    /**
     * Returns the permissions of the connected user for a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the list of permissions of the connected user for the group
     * @throws an error if the group does not exist
     */
    getGroupPermissions(uid?: string): Promise<GroupPermissions>;

    /**
     * Returns the information needed to edit a group.
     * @param permissions the permissions of the connected user for the group
     * @param uid the uid of the group to retrieve
     * @returns the information needed to edit the group
     * @throws an error if the group does not exist
     */
    getGroupEditInfo(permissions: GroupPermissions, uid?: string): Promise<UpdateGroupInput>;

    /**
     * Updates a group with the specified parameters.
     * @param data the data to update the group with
     * @throws an error if the group could not be updated
     */
    updateGroup(data: UpdateGroupPatch): Promise<void>;
}

export interface StudentAssociationRepository {
    /**
     * Returns the profile of a student association by its uid.
     * @param uid the uid of the student association to retrieve
     * @returns the profile of the student association, or null if not found
     */
    getStudentAssociationProfile(uid?: string): Promise<StudentAssociationProfile>;
    /**
     * Returns the groups belonging to a certain type of a student association by its uid.
     * @param uid the uid of the student association to retrieve
     * @param types the types of groups to retrieve
     * @param args the pagination information, first for the number of items to retrieve, after for the cursor of the previous page (if null, we retrieve the items from the beginning)
     * @returns a page of group avatars with pagination information, or null if the student association is not found
     */
    getStudentAssociationGroups(
        types: GroupType[],
        args: PageRequest,
        uid?: string
    ): Promise<Page<GroupAvatar>>;

    /**
     * Returns the services of a student association by its uid.
     * @param uid the uid of the student association to retrieve
     * @param args the pagination information, first for the number of items to retrieve, after for the cursor of the previous page (if null, we retrieve the items from the beginning)
     * @returns a page of card services with pagination information, or null if the student association is not found
     */
    getStudentAssociationServices(uid?: string, args?: PageRequest): Promise<Page<CardService>>;
}

export interface SchoolRepository {
    /**
     * Returns the profile of a school by its uid.
     * @param uid the uid of the school to retrieve
     * @returns the profile of the school
     */
    getSchoolProfile(uid?: string): Promise<SchoolProfile>;

    /**
     * Returns the infos of a school by its uid. The infos are mainly the address and the list of student associations of the school.
     * @param uid the uid of the school to retrieve
     * @returns the infos of the school
     */
    getSchoolInfos(uid?: string): Promise<SchoolInfos>;

    /**
     * Returns the list of majors of a school by its uid.
     * @param uid the uid of the school to retrieve
     * @returns the list of majors of the school
     */
    getSchoolMajors(uid?: string): Promise<MajorInfos[]>;

    /**
     * Returns the services of a school by its uid.
     * @param uid the uid of the school to retrieve
     * @returns a page of card services with pagination information
     */
    getSchoolServices(uid?: string, args?: PageRequest): Promise<CardService[]>;
}

export interface MajorRepository {
    /**
     * Returns the profile of a major by its uid.
     * @param uid the uid of the major to retrieve
     * @returns the profile of the major
     */
    getMajorProfile(uid?: string): Promise<MajorInfos>;
}

/**
 * Repository that handles services related API interactions
 */
export interface ServiceRepository {
    /**
     * Returns the list of services that are available for the user to see.
     * @returns a list of card services
     */
    getServices(): Promise<CardService[]>;
}
