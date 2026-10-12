import { graphql } from '#lib/api/graphql/graphql.ts';

export const PageInfoFragment = graphql(`
    fragment PageInfo on PageInfo {
        hasNextPage
        endCursor
    }
`);
