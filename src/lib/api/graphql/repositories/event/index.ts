import type { EventRepository } from '#lib/api/repositories.ts';
import { request } from '#lib/api/graphql/client.ts';
import {
    mapBookingEventResult,
    mapEventDetail,
    mapEvents
} from '#lib/api/graphql/mappers/event/index.ts';
import { BookEvent, GetEventById, GetEvents } from '#lib/api/graphql/queries/event/index.ts';
import type { PageRequest } from '#lib/api/index.ts';

export const eventRepository: EventRepository = {
    async getEvents(args: PageRequest) {
        try {
            const response = await request(GetEvents, args);
            return mapEvents(response);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching events:', error);
            throw error;
        }
    },
    async getEventById(id: string | undefined) {
        if (!id) {
            throw new Error('Not found');
        }
        try {
            const response = await request(GetEventById, { id: id });
            if (!response.event) {
                throw new Error('Not found');
            }
            return mapEventDetail(response.event);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching events:', error);
            throw error;
        }
    },
    async createEvent(groupId: string, title: string, createManagerInvite: boolean) {
        //TODO : Implement createEvent
        throw new Error('Not implemented');
    },
    async editEvent() {
        //TODO : Implement event editing
        throw new Error('Not implemented');
    },
    async deleteEvent() {
        //TODO : Implement event deletion
        throw new Error('Not implemented');
    },
    async bookEvent(
        bookingUrl: string,
        ticketId: string,
        beneficiary?: string,
        churrosBeneficiary?: string
    ) {
        try {
            const response = await request(BookEvent, {
                bookingUrl,
                ticketId,
                beneficiary,
                churrosBeneficiary
            });
            return mapBookingEventResult(response.bookEvent);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error booking event:', error);
            throw error;
        }
    }
};
