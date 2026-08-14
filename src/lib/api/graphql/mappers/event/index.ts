import type { Event, EventDetail, Page } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetEventById, GetEvents } from '$lib/api/graphql/queries/event';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import { CardEventFragment } from '../../queries/fragments/cardEvent';
import { mapGroupAvatar } from '../group';
import { mapTicket, mapTicketDetail } from '../ticket';

type EventGraphQLNode = ResultOf<typeof GetEvents>['events'];

export function mapEvents(events: ResultOf<typeof GetEvents>): Page<Event> {
    const pageInfo = readFragment(PageInfoFragment, events.events.pageInfo);
    return {
        items: events.events.edges.map((edge) => mapEvent(edge.node)),
        pageInfo
    };
}

function mapEvent(event: EventGraphQLNode['edges'][number]['node']): Event {
    const data = readFragment(CardEventFragment, event);
    return {
        id: data.localID,
        pictureURL: data.pictureURL,
        title: data.title,
        descriptionPreview: data.descriptionPreview,
        organizer: mapGroupAvatar(data.organizer),
        coOrganizers: data.coOrganizers.map((coOrganizerAvatar) => mapGroupAvatar(coOrganizerAvatar)),
        startsAt: data.startsAt ? new Date(data.startsAt) : null,
        endsAt: data.endsAt ? new Date(data.endsAt) : null,
        location: data.location,
        tickets: data.tickets.map((ticket) => mapTicket(ticket))
    };
}

export function mapEventDetail(event: ResultOf<typeof GetEventById>['event']): EventDetail {
    return {
        title: event.title,
        location: event.location,
        description: event.description,
        descriptionHtml: event.descriptionHtml,
        startsAt: event.startsAt ? new Date(event.startsAt) : null,
        endsAt: event.endsAt ? new Date(event.endsAt) : null,
        frequency: event.frequency,
        recurringUntil: event.recurringUntil ? new Date(event.recurringUntil) : null,
        externalTicketing: event.externalTicketing,
        organizer: mapGroupAvatar(event.organizer),
        coOrganizers: event.coOrganizers.map((coOrganizerAvatar) => mapGroupAvatar(coOrganizerAvatar)),
        tickets: event.tickets.map((ticket) => mapTicketDetail(ticket))
    }
}