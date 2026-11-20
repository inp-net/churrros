import { request } from '#lib/api/graphql/client.ts';
import {
    mapBirthdays,
    mapGroupedBirthdays,
    mapUser,
    mapUserAvatar,
    mapUserFamily,
    mapUserGroups,
    mapUserInfos,
    mapUserProfile,
} from '#lib/api/graphql/mappers/user/index.ts';
import {
    GetBirthdays,
    GetGroupedBirthdays,
    GetUserAvatarByUid,
    GetUserByUid,
    GetUserFamily,
    GetUserGroups,
    GetUserInfos,
    GetUserProfile,
} from '#lib/api/graphql/queries/user/index.ts';
import type { UserRepository } from '#lib/api/repositories.ts';

export const userRepository: UserRepository = {
    async getBirthdays(activeOnly, date, width) {
        try {
            const response = await request(GetBirthdays, { activeOnly, date, width });
            return mapBirthdays(response.birthdays);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching birthdays:', error);
            throw error;
        }
    },
    async getGroupedBirthdays(activeOnly, date, width) {
        try {
            const response = await request(GetGroupedBirthdays, { activeOnly, date, width });
            return mapGroupedBirthdays(response.birthdays);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching grouped birthdays:', error);
            throw error;
        }
    },
    async getUserAvatarByUid(uid) {
        try {
            const response = await request(GetUserAvatarByUid, { uid });
            return mapUserAvatar(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user avatar:', error);
            throw error;
        }
    },
    async getUserByUid(uid) {
        try {
            const response = await request(GetUserByUid, { uid });
            return mapUser(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    async getUserFamily(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch user family');
            }
            const response = await request(GetUserFamily, { uid });
            return mapUserFamily(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user family:', error);
            throw error;
        }
    },
    async getUserGroups(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch user groups');
            }
            const response = await request(GetUserGroups, { uid });
            return mapUserGroups(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user groups:', error);
            throw error;
        }
    },
    async getUserInfos(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch user infos');
            }
            const response = await request(GetUserInfos, { uid });
            return mapUserInfos(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user infos:', error);
            throw error;
        }
    },
    async getUserProfile(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch user profile');
            }
            const response = await request(GetUserProfile, { uid });
            return mapUserProfile(response.user);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
};
