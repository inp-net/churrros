import { PUBLIC_API_URL } from '$app/env/public';
import type { Cookies } from '@sveltejs/kit';
import type { TadaDocumentNode } from 'gql.tada';
import { print } from 'graphql';

import { deserializeToken, getToken } from '#lib/auth/session.ts';
import { SESSION_TOKEN_COOKIE_NAME } from '#lib/auth/session.ts';

/**
 * Generic function to perform a GraphQL request, using the provided authentication token
 * @param document the graphql document to execute
 * @param variables the variables for the graphql document
 * @param options the fetch function to use and the authentication token
 * @returns the result of the GraphQL request
 */
async function requestGraphQL<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables,
    options?: { token?: string; fetch?: typeof fetch },
): Promise<Result> {
    const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        },
        fetchfn = options?.fetch || fetch;

    if (options?.token) {
        headers.Authorization = `Bearer ${options.token}`;
    }

    const response = await fetchfn(PUBLIC_API_URL, {
            body: JSON.stringify({
                query: print(document),
                variables,
            }),
            credentials: 'include',
            headers,
            method: 'POST',
        }),
        result = await response.json();
    console.log('GraphQL response:', result);
    if (result.errors) {
        // TODO : This is where errors should be correctly handled
        throw new Error(result.errors.map((error: any) => error.message).join('\n'));
    }

    return result.data as Result;
}

/**
 * Client-side function to perform a GraphQL request, using the session token for authentication.
 * @param document the graphql document to execute
 * @param variables the variables for the graphql document
 * @returns the result of the GraphQL request
 */
export async function request<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables,
): Promise<Result> {
    const sessionToken = getToken();

    return requestGraphQL(document, variables, { token: sessionToken?.token });
}

/**
 * Server-side function to perform a GraphQL request, using the cookies for authentication.
 * @param document the graphql document to execute
 * @param variables the variables for the graphql document
 * @param event the event containing the fetch function and the cookies
 * @returns the result of the GraphQL request
 */
export async function requestServer<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables,
    event?: { fetch: typeof fetch; cookies: Cookies },
): Promise<Result> {
    const rawToken = event?.cookies.get(SESSION_TOKEN_COOKIE_NAME),
        token = deserializeToken(rawToken)?.token;

    return requestGraphQL(document, variables, { fetch: event?.fetch, token });
}
