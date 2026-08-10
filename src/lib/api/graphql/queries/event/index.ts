import { graphql } from '$lib/api/graphql/graphql';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { TicketFragment } from '../fragments/ticket';

export const GetEvents = graphql(`
  query GetEvents($first: Int, $after: String) {
    events(first: $first, after: $after) {
      edges {
        node {
          localID
          slug
          title
          description
          startsAt
          location
          pictureURL
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`, [PageInfoFragment]);

export const GetEventById = graphql(`
  query GetEventById($id : LocalID!) {
    event(id: $id) {
      title,
      location,
      descriptionHtml
      tickets {
        ...TicketFragment
      }
      organizer {
        ...GroupAvatar
      }
      coOrganizers {
        ...GroupAvatar
      }
    }
  }
`, [GroupAvatarFragment, TicketFragment]);