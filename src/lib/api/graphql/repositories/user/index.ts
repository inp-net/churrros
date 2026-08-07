import type { UserRepository } from "$lib/api/repositories";
import { request, requestServer } from "$lib/api/graphql/client";
import type { Cookies } from '@sveltejs/kit';
import { GetMe, GetUserByUid } from "$lib/api/graphql/queries/user";
import { mapMe, mapUser } from "$lib/api/graphql/mappers/user";


export const userRepository: UserRepository = {
    async getUserByUid(uid: string) {
        try {
            const response = await request(GetUserByUid, { uid });
            return mapUser(response.user);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    async getMe(event?: { fetch: typeof fetch, cookies: Cookies }) {
        try {
            const response = await requestServer(GetMe, undefined, event);
            return mapMe(response.me);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching current user:', error);
            throw error;
        }
    }
}