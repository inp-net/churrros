import { readFragment, type FragmentOf } from 'gql.tada';
import { MutationErrorsFragment } from './queries/fragments/mutationErrors';
import { ApiValidationError } from '../errors';

/**
 * This function asserts the success of a mutation, it's used to handle multiple mutation responses
 * @param result The result of the mutation to assert
 * @throws {Error} If the mutation failed with an error
 * @throws {ApiValidationError} If the mutation failed with a validation error
 */
export function assertMutationSuccess(
    result: FragmentOf<typeof MutationErrorsFragment> | { __typename?: string }
) {
    const data = readFragment(
        MutationErrorsFragment,
        result as FragmentOf<typeof MutationErrorsFragment>
    );
    switch (data.__typename) {
        case 'Error':
            throw new Error(data.message);

        case 'ZodError':
            throw new ApiValidationError(data.fieldErrors);
        default: // Success do nothing
            return;
    }
}
