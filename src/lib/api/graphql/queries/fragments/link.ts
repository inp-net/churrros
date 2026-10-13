import { graphql } from '#lib/api/graphql/graphql.ts';

export const LinkFragment = graphql(`
    fragment Link on Link {
        url
        text
    }
`);
