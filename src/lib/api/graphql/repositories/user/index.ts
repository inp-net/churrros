import type { UserRepository } from '$lib/api/repositories';
import { request } from '$lib/api/graphql/client';
import { GetUserAvatarByUid, GetUserByUid, GetUserFamily, GetUserGroups, GetUserInfos } from '$lib/api/graphql/queries/user';
import { mapUser, mapUserAvatar, mapUserFamily, mapUserGroups, mapUserInfos } from '$lib/api/graphql/mappers/user';

export const userRepository: UserRepository = {
    async getUserByUid(uid: string) {
        try {
            const response = await request(GetUserByUid, { uid });
            return mapUser(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    async getUserAvatarByUid(uid: string) {
        try {
            const response = await request(GetUserAvatarByUid, { uid });
            return mapUserAvatar(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user avatar:', error);
            throw error;
        }
    },
    async getUserInfos(uid: string) {
        try {
            const response = await request(GetUserInfos, { uid });
            return mapUserInfos(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user infos:', error);
            throw error;
        }
    },
    async getUserGroups(uid: string) {
        try {
            const response = await request(GetUserGroups, { uid });
            return mapUserGroups(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user groups:', error);
            throw error;
        }
    },
    async getUserFamily(uid: string) {
        try {
            const response = await request(GetUserFamily, { uid });
            return mapUserFamily(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user family:', error);
            throw error;
        }
    }
};