import type { Ticket, TicketDetail } from '#lib/api/types.ts';
import { readFragment, type $tada } from 'gql.tada';
import { CardTicketFragment } from '#lib/api/graphql/queries/fragments/cardTicket.ts';
import { TicketDetailFragment } from '../../queries/fragments/ticketDetail';
import { mapGroupAvatar } from '../group';
import { mapMajor, mapSchool } from '../user';

type CardTicketFragmentType = {
    [$tada.fragmentRefs]: {
        CardTicket: 'Ticket';
    };
};

type TicketDetailFragmentType = {
    [$tada.fragmentRefs]: {
        TicketDetail: 'Ticket';
    };
};

export function mapTicket(ticket: CardTicketFragmentType): Ticket {
    const data = readFragment(CardTicketFragment, ticket);
    return {
        id: data.localID,
        opensAt: data.opensAt,
        closesAt: data.closesAt,
        name: data.name,
        price: data.minimumPrice,
        priceIsVariable: data.priceIsVariable
    };
}

export function mapTicketDetail(ticket: TicketDetailFragmentType): TicketDetail {
    const data = readFragment(TicketDetailFragment, ticket);
    return {
        ...mapTicket(data),
        capacity: data.capacity,
        showCapacity: data.event.showCapacity,
        placesLeft: data.placesLeft,
        showPlacesLeft: data.event.showPlacesLeft,
        invited: data.invited,
        openToGroups: data.openToGroups.map((group) => mapGroupAvatar(group)),
        openToMajors: data.openToMajors.map((major) => mapMajor(major)),
        openToSchools: data.openToSchools.map((school) => mapSchool(school))
    };
}
