import type { Event } from '$lib/api';

export interface EventRepository {
    async getEvents(): Promise<Event[]>;
}