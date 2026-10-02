import type {
    PageRequest,
    Page,
    EventDetail,
    GroupAvatar,
    Avatar,
    UserInfos,
    UserGroups,
    UserFamily,
    Article,
    ArticleDetail,
    UserProfile
} from '$lib/api';
import type { Event } from '$lib/api';
import type { SessionToken } from '$lib/api';
import type { User } from '$lib/api';
import type { Cookies } from '@sveltejs/kit';

/**
 * Repository pour la gestion des évents
 */
export interface EventRepository {
    /**
     * Recupère les événements avec pagination.
     * @param args les informations de pagination, first pour le nombre d'éléments à récupérer, after pour le curseur de la page précédente (si null, on récupère les éléments depuis le début
     * @returns une page d'événements avec les informations de pagination
     */
    getEvents(args: PageRequest): Promise<Page<EventsByDay>>;

    /**
     * Recupère le detail d'un event par son id.
     * @param id L'id de l'event
     * @returns Le detail de l'event si il existe
     * @throws une erreur si l'event n'existe pas
     */
    getEventById(id: string | undefined): Promise<EventDetail>;

    /**
     * Crée un event presque vide
     * WIP
     * @param groupId l'uid du groupe qui va organiser l'event
     * @param title le titre de l'event
     * @param createManagerInvite si on crée un lien pour inviter d'autres gens à manager l'event
     * @returns l'id de l'event créé
     */
    createEvent(groupId: string, title: string, createManagerInvite: boolean): Promise<string>;

    /**
     * Modifie un event
     * WIP
     */
    editEvent();

    /**
     * Supprime un event
     * WIP
     */
    deleteEvent();

    /**
     * Crée une reservation pour un event
     * @param bookingUrl : URL vers la page du billet (Reliquat churros V2)
     * @param ticketId : Id du ticket à reserver
     * @param beneficiary : Nom et prénom du bénéficiaire (Pour les extés) (Optionnel)
     * @param churrosBeneficiary : UID churros du bénéficiaire si ce n'est pas l'utilisateur actuel (Optionnel)
     *
     */
    bookEvent(
        bookingUrl: string,
        ticketId: string,
        beneficiary?: string,
        churrosBeneficiary?: string
    ): Promise<string>;
};

/**
 * Repository sur les intéractions avec l'API en rapport avec l'authentification
 */
export interface AuthRepository {
    /**
     * Recupère un token de session pour l'utilisateur avec l'email ou l'uid et le mot de passe fourni.
     * @param emailOrUid l'email ou l'uid de l'utilisateur
     * @param password le mot de passe de l'utilisateur
     * @returns un token de session si l'authentification est réussie, sinon une erreur est levée
     */
    login(emailOrUid: string, password: string): Promise<SessionToken>;
};

/**
 * Repository qui permet de récuperer les informations sur les utilisateurs
 */
export interface UserRepository {
    /**
     * Recupère les informations d'un utilisateur par son uid.
     * @param uid l'uid de l'utilisateur à récupérer
     * @returns les informations de l'utilisateur, ou null si non trouvé
     */
    getUserByUid(uid: string): Promise<User | null>;

    /**
     * Récupère l'avatar d'un utilisateur par son uid.
     * @param uid l'uid de l'utilisateur à récupérer
     * @returns l'avatar de l'utilisateur, ou null si non trouvé
     */
    getUserAvatarByUid(uid: string): Promise<Avatar | null>;

    /**
     * Fetches the profile of a user by their uid.
     * @param uid the uid of the user to retrieve
     * @returns the profile of the user, or null if not found
     */
    getUserProfile(uid?: string): Promise<UserProfile | null>;

    /**
     * Returns the infos of a user by its uid.
     * @param uid the uid of the user to retrieve
     * @returns the infos of the user, or null if not found
     */
    getUserInfos(uid?: string): Promise<UserInfos | null>;

    /**
     * Returns the groups that a user is a member of by its uid.
     * @param uid the uid of the user to retrieve
     * @returns the groups that the user is a member of, or null if user is not found
     */
    getUserGroups(uid?: string): Promise<UserGroups | null>;

    /**
     * Returns the family of a user by its uid.
     * @param uid the uid of the user to retrieve
     * @returns the family of the user, or null if user is not found
     */
    getUserFamily(uid?: string): Promise<UserFamily | null>;

    /**
     * Fetches the birthdays of users.Only works when logged in.
     * @param date The date around which to fetch birthdays in ISO format(optionnal)(By default the current date on the server)
     * @param activeOnly True if we want only active users in first, second or third year, false if we want all users
     * @param width The number of days around the date(optionnal)(By default 1 day)
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
};

/**
 * Le repository qui permet de récuperer les informations et permissions de l'utilisateur actuellement connecté
 */
export interface MeRepository {
    /**
     * Recupère les informations de l'utilisateur actuellement connecté.
     * Requete GraphQL côté serveur
     * @param event l'event serveur contenant la fonction fetch et les cookies
     * @returns les informations de l'utilisateur actuellement connecté, ou null si non connecté
     */
    getMe(event?: { fetch: typeof fetch; cookies: Cookies }): Promise<User | null>;

    /**
     * Recupère la liste des groupes sur lesquels l'utilisateur connecté peut créer des events
     * @returns Avatar sur tous ces groupes
     */
    getCanCreateEventsOn(): Promise<Avatar[]>;
};

/**
 * Repository to handle articles
 */
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
};

/**
 * Repository that handles group-related API interactions
 */
export interface GroupRepository {
    /**
     * Returns the profile of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the profile of the group, or null if not found
     */
    getGroupProfile(uid?: string): Promise<GroupProfile | null>;

    /**
     * Returns the infos of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the infos of the group, or null if not found
     */
    getGroupInfos(uid?: string): Promise<GroupInfos | null>;

    /**
     * Returns the board members of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the board members of the group, or null if not found
     */
    getGroupBoardMembers(uid?: string): Promise<GroupBoardMembers | null>;

    /**
     * Returns the "see also" information of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @returns the "see also" information of the group, or null if not found
     */
    getGroupSeeAlso(uid?: string): Promise<GroupSeeAlso | null>;

    /**
     * Returns a paginated list of members of a group by its uid.
     * @param uid the uid of the group to retrieve
     * @param args the pagination information, first for the number of items to retrieve, after for the cursor of the previous page (if null, we retrieve the items from the beginning)
     * @returns a page of group members with pagination information, or null if the group is not found
     */
    getGroupMembers(uid?: string, args: PageRequest): Promise<Page<GroupMemberByDate> | null>;
};