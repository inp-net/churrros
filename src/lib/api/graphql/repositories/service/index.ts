import type { ServiceRepository } from '#lib/api/repositories.ts';
import type { ServiceInput } from '#lib/forms/service/service.schema.ts';

import { request } from '../../client';
import { mapServiceInfo, mapServices } from '../../mappers/service';
import { UpsertService, GetServices, GetServiceInfo } from '../../queries/service';

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
    async upsertService(data: ServiceInput, id?: string) {
        try {
            const input = {
                url: data.url,
                name: data.name,
                description: data.description,
                importance: data.importance,
                hide: data.hide,
                iconURL: data.iconUrl,
                school: data.schoolId,
                unlinkSchool: data.schoolId === null,
                group: data.groupId,
                unlinkGroup: data.groupId === null,
                studentAssociation: data.studentAssociationId,
                unlinkStudentAssociation: data.studentAssociationId === null,
            };
            await request(UpsertService, { input, id });
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error upserting service:', error);
            throw error;
        }
    },
    async getServiceInfo(id?: string) {
        try {
            if (!id) {
                throw new Error('Service ID is required to fetch service info.');
            }
            const response = await request(GetServiceInfo, { id });
            return mapServiceInfo(response.service);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching service info:', error);
            throw error;
        }
    },
};
