import type { UserRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { GetUserAvatarByUid, GetUserByUid } from "$lib/api/graphql/queries/user";
import { mapUser, mapUserAvatar } from "$lib/api/graphql/mappers/user";


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
    async getUserAvatarByUid(uid: string) {
        try {
            const response = await request(GetUserAvatarByUid, { uid });
            return mapUserAvatar(response.user);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user avatar:', error);
            throw error;
        }
    }
}