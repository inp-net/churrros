import { graphql } from '$lib/api/graphql/graphql';
import { CardTicketFragment } from './cardTicket';
import { GroupAvatarFragment } from './groupAvatar';

/**
 * Fragment graphql qui permet de récupérer les informations d'un event pour l'afficher dans le composant CardEvent.
 */
export const CardEventFragment = graphql(
	`
		fragment CardEvent on Event {
			localID
			pictureURL
			title
			descriptionPreview
			organizer {
				...GroupAvatar
			}
			coOrganizers {
				...GroupAvatar
			}
			startsAt
			endsAt
			frequency
			recurringUntil
			location
			tickets {
				...CardTicket
			}
		}
	`,
	[GroupAvatarFragment, CardTicketFragment]
);
