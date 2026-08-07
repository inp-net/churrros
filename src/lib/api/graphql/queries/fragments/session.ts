import { graphql } from '$lib/api/graphql/graphql';

export const SessionTokenFragment = graphql(`
  fragment SessionToken on Credential {
    token
    expiresAt
  }
`);