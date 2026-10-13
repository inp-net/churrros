import { graphql } from '#lib/api/graphql/graphql.ts';

export const CardTicketFragment = graphql(`
    fragment CardTicket on Ticket {
        localID
        opensAt
        closesAt
        name
        minimumPrice(applyPromotions: true)
        priceIsVariable
    }
`);
