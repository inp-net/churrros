import type { Event } from '$lib/api';

export interface EventRepository {
    async getEvents(): Promise<Event[]>;
}

export interface AuthRepository {
    async login(emailOrUid: string, password: string): Promise<SessionToken>;
}