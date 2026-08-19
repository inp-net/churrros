import { graphql } from '$lib/api/graphql/graphql';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { CardEventFragment } from '../fragments/cardEvent';
import { TicketDetailFragment } from '../fragments/ticketDetail';

export const GetEvents = graphql(`
  query GetEvents($first: Int, $after: String) {
    eventsByDay(first: $first, after: $after) {
      edges {
        node {
          date
          shotgunning {
            ...CardEvent
          }
          happening {
            ...CardEvent
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`, [PageInfoFragment, CardEventFragment]);

export const GetEventById = graphql(`
  query GetEventById($id : LocalID!) {
    event(id: $id) {
      title,
      location,
      description,
      descriptionHtml,
      startsAt,
      endsAt,
      frequency,
      recurringUntil,
      externalTicketing,
      organizer {
        ...GroupAvatar
      }
      coOrganizers {
        ...GroupAvatar
      }
      tickets {
        ...TicketDetail
      }
    }
  }
`, [GroupAvatarFragment, TicketDetailFragment]);