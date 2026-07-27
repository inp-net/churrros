import { graphql } from '$lib/api/graphql/graphql';

export const SessionTokenFragment = graphql(`
  fragment SessionToken on Credential {
    token
    expiresAt
  }
`);

export const MutationErrorsFragment = graphql(`
  fragment MutationErrors on ErrorInterface {
    __typename
    ... on Error {
      message
    }
    ... on ZodError {
      fieldErrors {
        path
        message
      }
    }
    ... on NotFoundError {
      message
    }
  }
`);