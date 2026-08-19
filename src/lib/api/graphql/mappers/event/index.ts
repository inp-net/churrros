import type { Event, EventDetail, EventsByDay, Page } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetEventById, GetEvents } from '$lib/api/graphql/queries/event';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import type { $tada } from 'gql.tada';
import { CardEventFragment } from '../../queries/fragments/cardEvent';
import { mapGroupAvatar } from '../group';
import { mapTicket, mapTicketDetail } from '../ticket';

type EventGraphQLNode = ResultOf<typeof GetEvents>['eventsByDay'];

export function mapEvents(events: ResultOf<typeof GetEvents>): Page<EventsByDay> {
    const pageInfo = readFragment(PageInfoFragment, events.eventsByDay.pageInfo);
    console.log("pageInfo : ", pageInfo);
    return {
        items: events.eventsByDay.edges.map((edge) => mapEventByDay(edge.node)),
        pageInfo
    };
}

function mapEventByDay(eventByDay: EventGraphQLNode['edges'][number]['node']): EventsByDay {
    return {
        date: new Date(eventByDay.date),
        shotgunning: eventByDay.shotgunning.map((event) => mapEvent(event)),
        happening: eventByDay.happening.map((event) => mapEvent(event))
    };
}

type CardEventFragmentType = {
    [$tada.fragmentRefs]: {
        CardEvent: "Event";
    };
}

function mapEvent(event: CardEventFragmentType): Event {
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