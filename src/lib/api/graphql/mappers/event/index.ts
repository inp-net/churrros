import type { Event, Page } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetEvents } from '$lib/api/graphql/queries/event';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';

type EventGraphQLNode = ResultOf<typeof GetEvents>['events'];

export function mapEvents(events: ResultOf<typeof GetEvents>): Page<Event> {
    const pageInfo = readFragment(PageInfoFragment, events.events.pageInfo);
    return {
        items: events.events.edges.map((edge) => mapEvent(edge.node)),
        pageInfo
    };
}

export function mapEvent(event: EventGraphQLNode['edges'][number]['node']): Event {
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