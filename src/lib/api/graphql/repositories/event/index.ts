import { page } from '$app/state';

import { request } from '#lib/api/graphql/client.ts';
import {
    mapBookingEventResult,
    mapEventDetail,
    mapEvents,
} from '#lib/api/graphql/mappers/event/index.ts';
import { BookEvent, GetEventById, GetEvents } from '#lib/api/graphql/queries/event/index.ts';
import type { PageRequest } from '#lib/api/index.ts';
import type { EventRepository } from '#lib/api/repositories.ts';

export const eventRepository: EventRepository = {
    async bookEvent(ticketId: string, beneficiary?: string, churrosBeneficiary?: string) {
        try {
            const response = await request(BookEvent, {
                beneficiary,
                bookingUrl: `${page.url.origin}/bookings/[code]`,
                churrosBeneficiary,
                ticketId,
            });
            return mapBookingEventResult(response.bookEvent);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error booking event:', error);
            throw error;
        }
    },
    async createEvent(_groupId: string, _title: string, _createManagerInvite: boolean) {
        //TODO : Implement createEvent
        throw new Error('Not implemented');
    },
    async deleteEvent() {
        //TODO : Implement event deletion
        throw new Error('Not implemented');
    },
    async editEvent() {
        //TODO : Implement event editing
        throw new Error('Not implemented');
    },
    async getEventById(id: string | undefined) {
        if (!id) {
            throw new Error('Not found');
        }
        try {
            const response = await request(GetEventById, { id });
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
};
