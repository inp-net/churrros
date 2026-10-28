import type { ServiceRepository } from '#lib/api/repositories.ts';

import { request } from '../../client';
import { mapServices } from '../../mappers/service';
import { GetServices } from '../../queries/service';

export const serviceRepository: ServiceRepository = {
    async getServices() {
        try {
            const response = await request(GetServices, { mine: true }); //Mine is used to fiter services to only fetch the ones that are available for the user to see
            return mapServices(response.services);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching services:', error);
            throw error;
        }
    },
};
