import type { MajorRepository } from '#lib/api/repositories.d.ts';
import { request } from '#lib/api/graphql/client.ts';
import { mapMajorInfos } from '#lib/api/graphql/mappers/major/index.ts';
import { GetMajorProfile } from '#lib/api/graphql/queries/major/index.ts';

export const majorRepository: MajorRepository = {
    async getMajorProfile(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch major profile');
            }
            const response = await request(GetMajorProfile, { uid });
            return mapMajorInfos(response.major);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching major profile:', error);
            throw error;
        }
    }
};
