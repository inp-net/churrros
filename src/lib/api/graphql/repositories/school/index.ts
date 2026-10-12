import type { SchoolRepository } from '#lib/api/repositories.d.ts';
import { request } from '#lib/api/graphql/client.ts';
import {
    GetSchoolInfos,
    GetSchoolMajors,
    GetSchoolProfile,
    GetSchoolServices
} from '../../queries/school';
import {
    mapSchoolInfos,
    mapSchoolMajors,
    mapSchoolProfile,
    mapSchoolServices
} from '../../mappers/school';

export const schoolRepository: SchoolRepository = {
    async getSchoolProfile(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch school profile');
            }
            const response = await request(GetSchoolProfile, { uid });
            return mapSchoolProfile(response.school);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching school profile:', error);
            throw error;
        }
    },
    async getSchoolInfos(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch school infos');
            }
            const response = await request(GetSchoolInfos, { uid });
            return mapSchoolInfos(response.school);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching school infos:', error);
            throw error;
        }
    },
    async getSchoolMajors(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch school majors');
            }
            const response = await request(GetSchoolMajors, { uid });
            return mapSchoolMajors(response.school);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching school majors:', error);
            throw error;
        }
    },
    async getSchoolServices(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch school services');
            }
            const response = await request(GetSchoolServices, { uid });
            return mapSchoolServices(response.school);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching school services:', error);
            throw error;
        }
    }
};
