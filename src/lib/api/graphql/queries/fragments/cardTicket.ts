import { graphql } from '$lib/api/graphql/graphql';

/**
 * Fragment graphql qui permet de récupérer les informations d'un ticket pour l'afficher dans le composant CardTicket.
 */
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
