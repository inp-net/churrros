import { PUBLIC_API_URL } from '$app/env/public';
import type { TadaDocumentNode } from 'gql.tada';
import { print } from 'graphql';
import { getToken } from '#lib/auth/session.ts';

/**
 * Client-side function to perform a GraphQL request, using the session token for authentication.
 * @param document the graphql document to execute
 * @param variables the variables for the graphql document
 * @returns the result of the GraphQL request
 */
export async function request<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables
): Promise<Result> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    const sessionToken = getToken();
    if (sessionToken) {
        headers.Authorization = `Bearer ${sessionToken.token}`;
    }

    const response = await fetch(PUBLIC_API_URL, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
            query: print(document),
            variables
        })
    });

    const result = await response.json();
    console.log('GraphQL response:', result);
    if (result.errors) {
        // TODO : This is where errors should be correctly handled
        throw new Error(result.errors.map((error: any) => error.message).join('\n'));
    }

    return result.data as Result;
}
