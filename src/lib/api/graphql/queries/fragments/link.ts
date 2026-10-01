import { graphql } from '$lib/api/graphql/graphql';

/**
 * GraphQL fragment for links
 */
export const LinkFragment = graphql(`
    fragment Link on Link {
        url
        text
    }
`);
