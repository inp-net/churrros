import type { Event, EventDetail, EventsByDay, LightEvent, Page } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { BookEvent, GetEventById, GetEvents } from '$lib/api/graphql/queries/event';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import type { $tada } from 'gql.tada';
import { CardEventFragment } from '../../queries/fragments/cardEvent';
import { mapGroupAvatar } from '../group';
import { mapTicket, mapTicketDetail } from '../ticket';
import { LightEventFragment } from '../../queries/fragments/lightEvent';

type EventGraphQLNode = ResultOf<typeof GetEvents>['eventsByDay'];

export function mapEvents(events: ResultOf<typeof GetEvents>): Page<EventsByDay> {
    const pageInfo = readFragment(PageInfoFragment, events.eventsByDay.pageInfo);
    return {
        items: events.eventsByDay.edges.map((edge) => mapEventByDay(edge.node)),
        pageInfo
    };
}

function mapEventByDay(eventByDay: EventGraphQLNode['edges'][number]['node']): EventsByDay {
    return {
        date: eventByDay.date,
        shotgunning: eventByDay.shotgunning.map((event) => mapEvent(event)),
        happening: eventByDay.happening.map((event) => mapEvent(event))
    };
}

type CardEventFragmentType = {
    [$tada.fragmentRefs]: {
        CardEvent: "Event";
    };
}

export function mapEvent(event: CardEventFragmentType): Event {
    const data = readFragment(CardEventFragment, event);
    return {
        id: data.localID,
        pictureURL: data.pictureURL,
        title: data.title,
        descriptionPreview: data.descriptionPreview,
        organizer: mapGroupAvatar(data.organizer),
        coOrganizers: data.coOrganizers.map((coOrganizerAvatar) => mapGroupAvatar(coOrganizerAvatar)),
        startsAt: data.startsAt,
        endsAt: data.endsAt,
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
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        frequency: event.frequency,
        recurringUntil: event.recurringUntil,
        externalTicketing: event.externalTicketing,
        organizer: mapGroupAvatar(event.organizer),
        coOrganizers: event.coOrganizers.map((coOrganizerAvatar) => mapGroupAvatar(coOrganizerAvatar)),
        tickets: event.tickets.map((ticket) => mapTicketDetail(ticket))
    }
}

type LightEventFragmentType = {
    [$tada.fragmentRefs]: {
        LightEvent: "Event";
    };
}

export function mapLightEvent(event: LightEventFragmentType): LightEvent {
    const data = readFragment(LightEventFragment, event);
    return {
        id: data.localID,
        title: data.title,
        organizer: mapGroupAvatar(data.organizer),
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        location: data.location,
    };
}

export function mapBookingEventResult(result: ResultOf<typeof BookEvent>["bookEvent"]): string {
    if (!result) {
        throw new Error('No booking result data found');
    }

    switch (result.__typename) {
        case 'Error': {
            throw new Error(result.message);
        }
        case "MutationBookEventSuccess": {
            return result.data.localID;
        }
        default:
            throw new Error('No booking result data found');
    }
}

