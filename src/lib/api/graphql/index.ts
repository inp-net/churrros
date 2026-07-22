import type { EventRepository } from "../repositories";
import { request } from "./client";
import { mapEvents } from "./map";
import { GetEvents } from "./queries";

export const eventRepository: EventRepository = {
    async getEvents() {
        try {
            const response = await request(GetEvents);
            return mapEvents(response.events.edges);
        }
        catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }
}