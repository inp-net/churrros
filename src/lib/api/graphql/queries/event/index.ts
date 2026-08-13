import { graphql } from '$lib/api/graphql/graphql';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { CardTicketFragment } from '../fragments/cardTicket';
import { CardEventFragment } from '../fragments/cardEvent';

export const GetEvents = graphql(`
  query GetEvents($first: Int, $after: String) {
    events(first: $first, after: $after) {
      edges {
        node {
          ...CardEvent
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
      descriptionHtml
      tickets {
        ...CardTicket
      }
      organizer {
        ...GroupAvatar
      }
      coOrganizers {
        ...GroupAvatar
      }
    }
  }
`, [GroupAvatarFragment, CardTicketFragment]);