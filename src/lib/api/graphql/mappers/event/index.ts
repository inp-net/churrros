import type { $tada } from 'gql.tada';

import { type ResultOf, readFragment } from '#lib/api/graphql/graphql.ts';
import type { BookEvent, GetEventById, GetEvents } from '#lib/api/graphql/queries/event/index.ts';
import { LightEventFragment } from '#lib/api/graphql/queries/fragments/lightEvent.ts';
import { PageInfoFragment } from '#lib/api/graphql/queries/fragments/pagination.ts';
import type { Event, EventDetail, EventsByDay, LightEvent, Page } from '#lib/api/index.ts';

import { CardEventFragment } from '../../queries/fragments/cardEvent';
import { MutationErrorsFragment } from '../../queries/fragments/mutationErrors';
import { mapGroupAvatar } from '../group';
import { mapTicket, mapTicketDetail } from '../ticket';

type EventGraphQLNode = ResultOf<typeof GetEvents>['eventsByDay'];

export function mapEvents(events: ResultOf<typeof GetEvents>): Page<EventsByDay> {
    const pageInfo = readFragment(PageInfoFragment, events.eventsByDay.pageInfo);
    return {
        items: events.eventsByDay.edges.map((edge) => mapEventByDay(edge.node)),
        pageInfo,
    };
}

function mapEventByDay(eventByDay: EventGraphQLNode['edges'][number]['node']): EventsByDay {
    return {
        date: eventByDay.date,
        happening: eventByDay.happening.map((event) => mapEvent(event)),
        shotgunning: eventByDay.shotgunning.map((event) => mapEvent(event)),
    };
}

interface CardEventFragmentType {
    [$tada.fragmentRefs]: {
        CardEvent: 'Event';
    };
}

export function mapEvent(event: CardEventFragmentType): Event {
    const data = readFragment(CardEventFragment, event);
    return {
        coOrganizers: data.coOrganizers.map((coOrganizerAvatar) =>
            mapGroupAvatar(coOrganizerAvatar),
        ),
        descriptionPreview: data.descriptionPreview,
        endsAt: data.endsAt,
        id: data.localID,
        location: data.location,
        organizer: mapGroupAvatar(data.organizer),
        pictureURL: data.pictureURL,
        startsAt: data.startsAt,
        tickets: data.tickets.map((ticket) => mapTicket(ticket)),
        title: data.title,
    };
}

export function mapEventDetail(event: ResultOf<typeof GetEventById>['event']): EventDetail {
    return {
        coOrganizers: event.coOrganizers.map((coOrganizerAvatar) =>
            mapGroupAvatar(coOrganizerAvatar),
        ),
        description: event.description,
        descriptionHtml: event.descriptionHtml,
        endsAt: event.endsAt,
        externalTicketing: event.externalTicketing,
        frequency: event.frequency,
        location: event.location,
        organizer: mapGroupAvatar(event.organizer),
        recurringUntil: event.recurringUntil,
        startsAt: event.startsAt,
        tickets: event.tickets.map((ticket) => mapTicketDetail(ticket)),
        title: event.title,
    };
}

interface LightEventFragmentType {
    [$tada.fragmentRefs]: {
        LightEvent: 'Event';
    };
}

export function mapLightEvent(event: LightEventFragmentType): LightEvent {
    const data = readFragment(LightEventFragment, event);
    return {
        endsAt: data.endsAt,
        id: data.localID,
        location: data.location,
        organizer: mapGroupAvatar(data.organizer),
        startsAt: data.startsAt,
        title: data.title,
    };
}

export function mapBookingEventResult(result: ResultOf<typeof BookEvent>['bookEvent']): string {
    if (!result.__typename) {
        throw new Error('No booking result data found');
    }

    switch (result.__typename) {
        case 'Error': {
            const errorsFragment = readFragment(MutationErrorsFragment, result);
            throw new Error(errorsFragment.message);
        }
        case 'MutationBookEventSuccess': {
            return result.data.localID;
        }
        // TODO : Handle ZodErrors I forgor
        case 'ZodError':
        default: {
            throw new Error('No booking result data found');
        }
    }
}
