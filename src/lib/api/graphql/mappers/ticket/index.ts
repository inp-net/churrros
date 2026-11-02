import { type $tada, readFragment } from 'gql.tada';

import { CardTicketFragment } from '#lib/api/graphql/queries/fragments/cardTicket.ts';
import { TicketDetailFragment } from '#lib/api/graphql/queries/fragments/ticketDetail.ts';
import type { Ticket, TicketDetail } from '#lib/api/index.ts';

import { mapGroupAvatar } from '../group/index.ts';
import { mapMajor } from '../major';
import { mapSchool } from '../school';

interface CardTicketFragmentType {
    [$tada.fragmentRefs]: {
        CardTicket: 'Ticket';
    };
}

interface TicketDetailFragmentType {
    [$tada.fragmentRefs]: {
        TicketDetail: 'Ticket';
    };
}

export function mapTicket(ticket: CardTicketFragmentType): Ticket {
    const data = readFragment(CardTicketFragment, ticket);
    return {
        closesAt: data.closesAt,
        id: data.localID,
        name: data.name,
        opensAt: data.opensAt,
        price: data.minimumPrice,
        priceIsVariable: data.priceIsVariable,
    };
}

export function mapTicketDetail(ticket: TicketDetailFragmentType): TicketDetail {
    const data = readFragment(TicketDetailFragment, ticket);
    return {
        ...mapTicket(data),
        capacity: data.capacity,
        invited: data.invited,
        openToGroups: data.openToGroups.map((group) => mapGroupAvatar(group)),
        openToMajors: data.openToMajors.map((major) => mapMajor(major)),
        openToSchools: data.openToSchools.map((school) => mapSchool(school)),
        placesLeft: data.placesLeft,
        showCapacity: data.event.showCapacity,
        showPlacesLeft: data.event.showPlacesLeft,
    };
}
