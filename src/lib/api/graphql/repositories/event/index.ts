import type { EventRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { mapBookingEventResult, mapEventDetail, mapEvents } from "$lib/api/graphql/mappers/event";
import { BookEvent, GetEventById, GetEvents } from "$lib/api/graphql/queries/event";
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
    },
    async getEventById(id: string | undefined) {
        try {
            if (!id) {
                return null;
            }
            const response = await request(GetEventById, { id: id });
            return mapEventDetail(response.event);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching events:', error);
            return null;
        }
    },
    async createEvent(groupId: string, title: string, createManagerInvite: boolean) {
        //TODO : Implémenter la création d'event
        throw new Error("Not implemented");
    },
    async editEvent() {
        //TODO : Implémenter l'édition d'event
        throw new Error("Not implemented");
    },
    async deleteEvent() {
        //TODO : Implémenter la suppression d'event
        throw new Error("Not implemented");
    },
    async bookEvent(bookingUrl: string, ticketId: string, beneficiary?: string, churrosBeneficiary?: string) {
        try {
            const response = await request(BookEvent, { bookingUrl, ticketId, beneficiary, churrosBeneficiary });
            return mapBookingEventResult(response.bookEvent);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error booking event:', error);
            throw error;
        }
    }
}