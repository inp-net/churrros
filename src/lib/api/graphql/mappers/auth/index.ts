import type { SessionToken } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { LoginMutation } from '$lib/api/graphql/queries/auth';
import { MutationErrorsFragment } from '$lib/api/graphql/queries/fragments/mutation';
import { SessionTokenFragment } from '$lib/api/graphql/queries/fragments/session';

export const mapSessionToken = (data: ResultOf<typeof LoginMutation>['login']): SessionToken => {
    //TODO : Gestion d'erreurs mais ptet plus tot
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
                expiresAt: new Date(rawTokenFragment.expiresAt ?? new Date().toISOString()) //Techniquement jamais null mais vu qu'on force la conversion du type scalaire vers string il passe en nullable
            };
        }
        default:
            throw new Error('No session token data found');
    }
};