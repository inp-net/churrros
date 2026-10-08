import type { MajorRepository } from "$lib/api/repositories";
import { request } from "../../client";
import { mapMajorInfos } from "../../mappers/major";
import { GetMajorProfile } from "../../queries/major";

export const majorRepository: MajorRepository = {
    async getMajorProfile(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch major profile');
            }
            const response = await request(GetMajorProfile, { uid });
            return mapMajorInfos(response.major);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching major profile:', error);
            throw error;
        }
    },
}