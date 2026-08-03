import type { Event } from '$lib/api';
import type { ResultOf } from '$lib/api/graphql/graphql';
import type { GetEvents } from '$lib/api/graphql/queries/events';

type EventGraphQLNode = ResultOf<typeof GetEvents>['events']['edges'];

export function mapEvents(events: EventGraphQLNode): Event[] {
    return events.map((edge) => mapEvent(edge.node));
}

export function mapEvent(event: EventGraphQLNode[number]['node']): Event {
    return {
        id: event.id,
        slug: event.slug,
        title: event.title,
        description: event.description,
        startsAt: event.startsAt ? new Date(event.startsAt) : null,
        location: event.location,
        pictureURL: event.pictureURL
    };
}