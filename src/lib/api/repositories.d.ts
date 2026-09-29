import type { PageRequest, Page, EventDetail, GroupAvatar, Avatar, Article } from '$lib/api';
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
}

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
}

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
     * Récupère les anniversaires des utilisateurs.
     * @param date La date à partir de laquelle on veut récupérer les anniversaires (optionnel) (Par défaut la date actuelle)
     * @param activeOnly True si on veut que les utilisateurs actifs 1,2 ou 3A uniquement, false si on veut tous les utilisateurs
     * @param width La quantité de jours autour de date (optionnel) (Par défaut 1 jour)
     * @returns Un tableau d'avatars des utilisateurs dont c'est l'anniversaire
     */
    getBirthdays(activeOnly: boolean, date?: string, width?: number): Promise<Avatar[]>;

    /**
     * Récupère les anniversaires des utilisateurs groupés par jour.
     * @param activeOnly True si on veut que les utilisateurs actifs 1,2 ou 3A uniquement, false si on veut tous les utilisateurs
     * @param date La date à partir de laquelle on veut récupérer les anniversaires (optionnel) (Par défaut la date actuelle)
     * @param width La quantité de jours autour de date (optionnel) (Par défaut 1 jour)
     * @returns Un objet avec les dates comme clés et les tableaux d'avatars des utilisateurs dont c'est l'anniversaire comme valeurs
     */
    getGroupedBirthdays(activeOnly: boolean, date?: string, width?: number): Promise<Record<string, Avatar[]>>;
}

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
}

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
}