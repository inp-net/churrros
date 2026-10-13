import { graphql } from '#lib/api/graphql/graphql.ts';
// The issue with graphql fragments is that when we import a fragment from a file, we need to use all the fragments from that file, otherwise we get a TypeScript warning.
// So all fragments are currently spread across different files.
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
