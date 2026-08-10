import type { Ticket } from "$lib/api/types";
import { readFragment, type $tada } from "gql.tada";
import { TicketFragment } from "$lib/api/graphql/queries/fragments/ticket";

type TicketFragmentType = {
    [$tada.fragmentRefs]: {
        TicketFragment: "Ticket";
    };
}

export function mapTicket(ticket: TicketFragmentType): Ticket {
    const data = readFragment(TicketFragment, ticket);
    return {
        id: data.id
    }
}