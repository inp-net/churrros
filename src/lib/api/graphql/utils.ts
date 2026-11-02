import { type FragmentOf, readFragment } from 'gql.tada';

import { ApiValidationError } from '../errors';
import { MutationErrorsFragment } from './queries/fragments/mutationErrors';

// Not that clean because if the fragment changes, this will break, but for now it's fine. We can improve this later if we need to.
const ERROR_TYPENAMES = new Set(['Error', 'ZodError', 'NotFoundError', 'CheckBackLaterError']);

// This function is a typeguard, because oxlint doesn't allow just doing as Type, we have this function which will check if the result really is a mutation error and otherwise return false.
function isMutationError(
    result: FragmentOf<typeof MutationErrorsFragment> | { __typename?: string },
): result is FragmentOf<typeof MutationErrorsFragment> {
    return (
        '__typename' in result &&
        typeof result.__typename === 'string' &&
        ERROR_TYPENAMES.has(result.__typename)
    );
}

/**
 * This function asserts the success of a mutation, it's used to handle multiple mutation responses
 * @param result The result of the mutation to assert
 * @throws {Error} If the mutation failed with an error
 * @throws {ApiValidationError} If the mutation failed with a validation error
 */
export function assertMutationSuccess(
    result: FragmentOf<typeof MutationErrorsFragment> | { __typename?: string },
) {
    if (!isMutationError(result)) {
        // Success do nothing
        return;
    }

    const data = readFragment(
        MutationErrorsFragment,
        result,
    );
    switch (data.__typename) {
        case 'Error': {
            throw new Error(data.message);
        }

        case 'ZodError': {
            throw new ApiValidationError(data.fieldErrors);
        }
        default: {
            // Success do nothing
            return;
        }
    }
}
