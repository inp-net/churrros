import type { EventRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { mapEvents } from "$lib/api/graphql/mappers/event";
import { GetEvents } from "$lib/api/graphql/queries/event";

export const eventRepository: EventRepository = {
    async getEvents() {
        try {
            const response = await request(GetEvents);
            return mapEvents(response.events.edges);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching events:', error);
            throw error;
        }
    }
}