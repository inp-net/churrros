import { graphql } from '$lib/api/graphql/graphql';
import { PageInfoFragment } from '$lib/api/graphql/queries/fragments/pagination';

export const GetEvents = graphql(`
  query GetEvents($first: Int, $after: String) {
    events(first: $first, after: $after) {
      edges {
        node {
          id
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