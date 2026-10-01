import { graphql } from '$lib/api/graphql/graphql';

export const PageInfoFragment = graphql(`
    fragment PageInfo on PageInfo {
        hasNextPage
        endCursor
    }
`);
