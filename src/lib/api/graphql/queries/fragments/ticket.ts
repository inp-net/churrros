import { graphql } from '$lib/api/graphql/graphql';

//TODO : Trouver un bon nom
export const TicketFragment = graphql(`
    fragment TicketFragment on Ticket {
        id
    }   
`);