import { graphql } from '#lib/api/graphql/graphql.ts';
import { CardTicketFragment } from './cardTicket';
import { GroupAvatarFragment } from './groupAvatar';
import { MajorAvatarFragment } from './majorAvatar';
import { SchoolAvatarFragment } from './schoolAvatar';

/**
 * Fragment graphql qui permet de récupérer le detail d'un ticket pour l'afficher dans le composant TicketDetail.
 * Show capacity et showPlacesLeft, viennent de l'event et ne serve qu'a avoir un affichage différent pour dire que la personne voit la capacité
 * Avec ses droits de manager
 */
export const TicketDetailFragment = graphql(
    `
        fragment TicketDetail on Ticket {
            ...CardTicket
            capacity
            placesLeft
            invited
            openToGroups {
                ...GroupAvatar
            }
            openToMajors(smart: true) {
                ...MajorAvatar
            }
            openToSchools {
                ...SchoolAvatar
            }
            event {
                showCapacity
                showPlacesLeft
            }
        }
    `,
    [GroupAvatarFragment, CardTicketFragment, MajorAvatarFragment, SchoolAvatarFragment]
);
