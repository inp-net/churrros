import type { Cookies } from '@sveltejs/kit';

import { request, requestServer } from '#lib/api/graphql/client.ts';
import { mapMe, mapRememberPaymentPhone } from '#lib/api/graphql/mappers/me/index.ts';
import {
    GetCanCreateEventsOn,
    GetCanCreateGroupsOn,
    GetMe,
    RememberPaymentPhone,
} from '#lib/api/graphql/queries/me/index.ts';
import type { MeRepository } from '#lib/api/repositories.ts';

import { mapGroupAvatar } from '../../mappers/group';
import { mapStudentAssociationAvatar } from '../../mappers/studentassociation';

export const meRepository: MeRepository = {
    async getCanCreateEventsOn() {
        try {
            const response = await request(GetCanCreateEventsOn);
            if (!response.me) {
                return [];
            }
            return response.me?.canCreateEventsOn.map((groupAvatar) => mapGroupAvatar(groupAvatar));
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching current user:', error);
            throw error;
        }
    },
    async getCanCreateGroupsOn() {
        try {
            const response = await request(GetCanCreateGroupsOn);
            if (!response.me) {
                return [];
            }
            return response.me.canCreateGroupsOn.map((studentAssociationAvatar) =>
                mapStudentAssociationAvatar(studentAssociationAvatar),
            );
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching current user:', error);
            throw error;
        }
    },
    async getMe(event?: { fetch: typeof fetch; cookies: Cookies }) {
        try {
            const response = await requestServer(GetMe, undefined, event);
            return mapMe(response.me);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching current user:', error);
            throw error;
        }
    },
    async rememberPaymentPhone(phone: string) {
        try {
            const response = await request(RememberPaymentPhone, { phone });
            return mapRememberPaymentPhone(response.saveLydiaPhoneNumber);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error remembering payment phone:', error);
            throw error;
        }
    },
};
