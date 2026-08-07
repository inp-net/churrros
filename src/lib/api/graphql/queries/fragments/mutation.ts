import { graphql } from '$lib/api/graphql/graphql';
//Problème avec les fragments, quand on importe un fragment d'un fichier, il faut qu'on utilise tous les fragments du fichier sinon on a un warning
//typescript donc pour le moment ils sont tous repartis dans différents fichiers.
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