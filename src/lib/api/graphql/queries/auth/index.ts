import { graphql } from '$lib/api/graphql/graphql';
import { MutationErrorsFragment, SessionTokenFragment } from '../fragments';

export const LoginMutation = graphql(`
  mutation Login($emailOrUid: String!, $password: String!) {
    login(email: $emailOrUid, password: $password) {
      ...MutationErrors
      ... on MutationLoginSuccess {
        data {
          ...SessionToken
        }
      }
      ... on AwaitingValidationError {
        message
      }
    }
  }
  `,
  [MutationErrorsFragment, SessionTokenFragment]
);