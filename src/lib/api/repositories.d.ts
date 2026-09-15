import type { PageRequest, Page, EventDetail, GroupAvatar, Avatar, BookingDetail } from '$lib/api';
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
     * @param args les informations de pagination, first pour le nombre d'éléments à récupérer, after pour le curseur de la page précédente (si null, on récupère les éléments depuis le début)
     * @returns une page d'événements avec les informations de pagination
     */
    async getEvents(args: PageRequest): Promise<Page<EventsByDay>>;

    /**
     * Recupère le detail d'un event par son id.
     * @param id L'id de l'event
     * @returns Le detail de l'event si il existe
     * @throws une erreur si l'event n'existe pas
     */
    async getEventById(id: string | undefined): Promise<EventDetail>;

    /**
     * Crée un event presque vide
     * WIP
     * @param groupId l'uid du groupe qui va organiser l'event
     * @param title le titre de l'event
     * @param createManagerInvite si on crée un lien pour inviter d'autres gens à manager l'event
     * @returns l'id de l'event créé
     */
    async createEvent(groupId: string, title: string, createManagerInvite: boolean): Promise<string>;

    /**
     * Modifie un event
     * WIP
     */
    async editEvent();

    /**
     * Supprime un event
     * WIP
     */
    async deleteEvent();

    /**
     * Crée une reservation pour un event 
     * @param bookingUrl : URL vers la page du billet (Reliquat churros V2)
     * @param ticketId : Id du ticket à reserver 
     * @param beneficiary : Nom et prénom du bénéficiaire (Pour les extés) (Optionnel)
     * @param churrosBeneficiary : UID churros du bénéficiaire si ce n'est pas l'utilisateur actuel (Optionnel)
     * 
     */
    async bookEvent(bookingUrl: string, ticketId: string, beneficiary?: string, churrosBeneficiary?: string): Promise<string>
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
    async login(emailOrUid: string, password: string): Promise<SessionToken>;
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
    async getUserByUid(uid: string): Promise<User | null>;

    async getUserAvatarByUid(uid: string): Promise<Avatar | null>;
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
    async getMe(event?: { fetch: typeof fetch; cookies: Cookies }): Promise<User | null>;

    /**
     * Recupère la liste des groupes sur lesquels l'utilisateur connecté peut créer des events
     * @returns Avatar sur tous ces groupes
     */
    async getCanCreateEventsOn(): Promise<Avatar[]>;
}

export interface BookingRepository {
    /**
     * Récupère les réservations de l'utilisateur connecté avec pagination
     * @param args les informations de pagination, first pour le nombre d'éléments à récupérer, after pour le curseur de la page précédente (si null, on récupère les éléments depuis le début)
     * @returns une page de reservations avec les informations de pagination
     */
    async getMyBookings(args: PageRequest): Promise<Page<Booking>>;

    /**
     * Récupère une réservation par son code
     * @param code le code de la réservation
     * @param qrCodeUrlTemplate le template de l'url du QR code pour la réservation avec [code] comme placeholder pour le code de la réservation
     * @returns la réservation si elle existe
     * @throws une erreur si la réservation n'existe pas
     */
    async getBookingByCode(code?: string, qrCodeUrlTemplate: string): Promise<BookingDetail>;

    /**
     * Annule une réservation
     * @param code le code de la réservation
     * @throws une erreur si la réservation n'existe pas
     */
    async cancelBooking(code?: string): Promise<void>;

    /**
     * Récupère l'url pour le pass Google Wallet d'une réservation
     * @param code le code de la réservation
     * @returns l'url du pass Google Wallet
     * @throws une erreur si la réservation n'existe pas
     */
    async getGoogleWalletPass(code?: string): Promise<string>;

    /**
     * Récupère l'url pour le pass Apple Wallet d'une réservation
     * @param code le code de la réservation
     * @returns l'url du pass Apple Wallet
     * @throws une erreur si la réservation n'existe pas
     */
    async getAppleWalletPass(code?: string): Promise<string>;
}