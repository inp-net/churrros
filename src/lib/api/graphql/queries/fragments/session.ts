import { graphql } from '#lib/api/graphql/graphql.ts';

export const SessionTokenFragment = graphql(`
    fragment SessionToken on Credential {
        token
        expiresAt
    }
`);
