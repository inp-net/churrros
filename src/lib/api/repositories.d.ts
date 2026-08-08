import type { PageRequest, Page } from '$lib/api';
import type { Event } from '$lib/api';
import type { SessionToken } from '$lib/api';
import type { User, LightUser } from '$lib/api';
import type { Cookies } from '@sveltejs/kit';

export interface EventRepository {
    /**
     * Recupère les événements avec pagination.
     * @param args les informations de pagination, first pour le nombre d'éléments à récupérer, after pour le curseur de la page précédente (si null, on récupère les éléments depuis le début
     * @returns une page d'événements avec les informations de pagination
     */
    async getEvents(args: PageRequest): Promise<Page<Event>>;
}

export interface AuthRepository {
    /**
     * Recupère un token de session pour l'utilisateur avec l'email ou l'uid et le mot de passe fourni.
     * @param emailOrUid l'email ou l'uid de l'utilisateur
     * @param password le mot de passe de l'utilisateur
     * @returns un token de session si l'authentification est réussie, sinon une erreur est levée
     */
    async login(emailOrUid: string, password: string): Promise<SessionToken>;
}

export interface UserRepository {
    /**
     * Recupère les informations d'un utilisateur par son uid.
     * @param uid l'uid de l'utilisateur à récupérer
     * @returns les informations de l'utilisateur, ou null si non trouvé
     */
    async getUserByUid(uid: string): Promise<User | null>;
    /**
     * Recupère les informations de l'utilisateur actuellement connecté.
     * Requete GraphQL côté serveur
     * @param event l'event serveur contenant la fonction fetch et les cookies
     * @returns les informations de l'utilisateur actuellement connecté, ou null si non connecté
     */
    async getMe(event?: { fetch: typeof fetch; cookies: Cookies }): Promise<User | null>;
}