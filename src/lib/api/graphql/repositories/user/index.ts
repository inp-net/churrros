import type { UserRepository } from '$lib/api/repositories';
import { request } from '$lib/api/graphql/client';
import { GetBirthdays, GetGroupedBirthdays, GetUserAvatarByUid, GetUserByUid } from '$lib/api/graphql/queries/user';
import { mapBirthdays, mapGroupedBirthdays, mapUser, mapUserAvatar } from '$lib/api/graphql/mappers/user';

export const userRepository: UserRepository = {
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
    async getBirthdays(activeOnly, date, width) {
        try {
            const response = await request(GetBirthdays, { date, activeOnly, width });
            return mapBirthdays(response.birthdays);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching birthdays:', error);
            throw error;
        }
    },
    async getGroupedBirthdays(activeOnly, date, width) {
        try {
            const response = await request(GetGroupedBirthdays, { date, activeOnly, width });
            return mapGroupedBirthdays(response.birthdays);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching grouped birthdays:', error);
            throw error;
        }
    }
};