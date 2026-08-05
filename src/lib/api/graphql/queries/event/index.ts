import { graphql } from '$lib/api/graphql/graphql';

export const GetEvents = graphql(`
	query GetEvents {
		events {
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
		}
	}
`);