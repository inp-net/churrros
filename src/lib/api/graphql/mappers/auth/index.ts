import type { SessionToken } from '#lib/api/index.ts';
import { readFragment, type ResultOf } from '#lib/api/graphql/graphql.ts';
import type { LoginMutation } from '#lib/api/graphql/queries/auth/index.ts';
import { MutationErrorsFragment } from '#lib/api/graphql/queries/fragments/mutationErrors.ts';
import { SessionTokenFragment } from '#lib/api/graphql/queries/fragments/session.ts';

export const mapSessionToken = (data: ResultOf<typeof LoginMutation>['login']): SessionToken => {
    if (!data) {
        throw new Error('No session token data found');
    }

    switch (data.__typename) {
        case 'Error': {
            const errorsFragment = readFragment(MutationErrorsFragment, data);
            throw new Error(errorsFragment.message);
        }
        case 'ZodError': {
            const errorsFragment = readFragment(MutationErrorsFragment, data);
            throw new Error(
                `Validation error: ${errorsFragment.fieldErrors
                    .map((e) => `${e.path.join('.')}: ${e.message}`)
                    .join(', ')}`
            );
        }
        case 'AwaitingValidationError':
            throw new Error(data.message);
        case 'MutationLoginSuccess': {
            const rawTokenFragment = readFragment(SessionTokenFragment, data.data);

            return {
                token: rawTokenFragment.token,
                expiresAt: new Date(rawTokenFragment.expiresAt ?? new Date().toISOString()) // Technically never null, but with the scalar conversion it's marked as nullable, so we provide a fallback just in case
            };
        }
        default:
            throw new Error('No session token data found');
    }
};
