import type { StudentAssociationRepository } from '#lib/api/repositories.d.ts';
import { request } from '#lib/api/graphql/client.ts';
import {
    GetStudentAssociationGroups,
    GetStudentAssociationProfile,
    GetStudentAssociationServices
} from '../../queries/studentassociation';
import {
    mapStudentAssociationGroups,
    mapStudentAssociationProfile,
    mapStudentAssociationServices
} from '../../mappers/studentassociation';

export const studentAssociationRepository: StudentAssociationRepository = {
    async getStudentAssociationProfile(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch student association profile');
            }
            const response = await request(GetStudentAssociationProfile, { id: uid });
            return mapStudentAssociationProfile(response.studentAssociation);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching student association profile:', error);
            throw error;
        }
    },
    async getStudentAssociationGroups(uid, types, args) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch student association groups');
            }
            const response = await request(GetStudentAssociationGroups, {
                id: uid,
                types,
                ...args
            });
            return mapStudentAssociationGroups(response.studentAssociation);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching student association groups:', error);
            throw error;
        }
    },
    async getStudentAssociationServices(uid, args) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch student association services');
            }
            const response = await request(GetStudentAssociationServices, { id: uid, ...args });
            return mapStudentAssociationServices(response.studentAssociation);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching student association services:', error);
            throw error;
        }
    }
};
