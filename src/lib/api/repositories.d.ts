import type { Event } from '$lib/api';
import type { SessionToken } from '$lib/api';
import type { User, LightUser } from '$lib/api';

export interface EventRepository {
    async getEvents(): Promise<Event[]>;
}

export interface AuthRepository {
    async login(emailOrUid: string, password: string): Promise<SessionToken>;
}

export interface UserRepository {
    /**
     * 
     * @param uid 
     */
    async getUserByUid(uid: string): Promise<User>;
    /**
     * Recupère les informations de l'utilisateur actuellement connecté.
     * Requete GraphQL côté serveur
     * @param event l'event serveur contenant la fonction fetch et les cookies
     * @returns les informations de l'utilisateur actuellement connecté, ou null si non connecté
     */
    async getMe(event?: { fetch: any; cookies: any }): Promise<LightUser | null>;
}