import type { EventRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { mapEvents } from "$lib/api/graphql/mappers/event";
import { GetEvents } from "$lib/api/graphql/queries/event";
import type { PageRequest } from "$lib/api";

export const eventRepository: EventRepository = {
    async getEvents(args: PageRequest) {
        try {
            const response = await request(GetEvents, { first: args.first, after: args.after });
            return mapEvents(response);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching events:', error);
            throw error;
        }
    }
}