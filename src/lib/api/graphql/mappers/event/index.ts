import type { Event, EventDetail, Page } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetEventById, GetEvents } from '$lib/api/graphql/queries/event';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import { mapGroupAvatar } from '../group';
import { mapTicket } from '../ticket';

type EventGraphQLNode = ResultOf<typeof GetEvents>['events'];

export function mapEvents(events: ResultOf<typeof GetEvents>): Page<Event> {
    const pageInfo = readFragment(PageInfoFragment, events.events.pageInfo);
    return {
        items: events.events.edges.map((edge) => mapEvent(edge.node)),
        pageInfo
    };
}

function mapEvent(event: EventGraphQLNode['edges'][number]['node']): Event {
    return {
        id: event.localID,
        slug: event.slug,
        title: event.title,
        description: event.description,
        startsAt: event.startsAt ? new Date(event.startsAt) : null,
        location: event.location,
        pictureURL: event.pictureURL
    };
}

export function mapEventDetail(event: ResultOf<typeof GetEventById>['event']): EventDetail {
    return {
        title: event.title,
        descriptionHtml: event.descriptionHtml,
        location: event.location,
        organizer: mapGroupAvatar(event.organizer),
        coOrganizers: event.coOrganizers.map((coOrganizerAvatar) => mapGroupAvatar(coOrganizerAvatar)),
        tickets: event.tickets.map((ticket) => mapTicket(ticket))
    }
}