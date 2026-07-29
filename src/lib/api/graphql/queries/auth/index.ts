import { graphql } from '$lib/api/graphql/graphql';
import { MutationErrorsFragment, SessionTokenFragment } from '../fragments';

export const LoginMutation = graphql(`
  mutation Login($emailOrUid: String!, $password: String!) {
    login(email: $emailOrUid, password: $password) {
      ...MutationErrors
      ... on MutationLoginSuccess {
        __typename
        data {
          ...SessionToken
        }
      }
      ... on AwaitingValidationError {
        __typename
        message
      }
    }
  }
  `,
  [MutationErrorsFragment, SessionTokenFragment]
);