import type { UserRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { GetUserByUid } from "$lib/api/graphql/queries/user";
import { mapUser } from "$lib/api/graphql/mappers/user";


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
    }
}