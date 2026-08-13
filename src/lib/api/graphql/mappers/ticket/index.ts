import type { Ticket } from "$lib/api/types";
import { readFragment, type $tada } from "gql.tada";
import { CardTicketFragment } from "$lib/api/graphql/queries/fragments/cardTicket";

type TicketFragmentType = {
    [$tada.fragmentRefs]: {
        CardTicket: "Ticket";
    };
}

export function mapTicket(ticket: TicketFragmentType): Ticket {
    const data = readFragment(CardTicketFragment, ticket);
    return {
        id: data.localID,
        opensAt: data.opensAt ? new Date(data.opensAt) : null,
        closesAt: data.closesAt ? new Date(data.closesAt) : null,
        name: data.name,
        price: data.minimumPrice,
        priceIsVariable: data.priceIsVariable
    }
}