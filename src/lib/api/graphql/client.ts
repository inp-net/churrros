import type { TadaDocumentNode } from 'gql.tada';
import { print } from 'graphql';
import { PUBLIC_API_URL } from '$env/static/public';
import { getToken, deserializeToken } from '$lib/auth/session';
import type { Cookies } from '@sveltejs/kit';
import { SESSION_TOKEN_COOKIE_NAME } from '$lib/auth/session';

/**
 * Fonction générique pour effectuer une requête GraphQL, en utilisant le token d'authentification fourni
 * @param document La requête GraphQL à exécuter
 * @param variables Les variables de la requête GraphQL
 * @param options La fonction fetch à utiliser et le token d'authentification
 * @returns le résultat de la requête GraphQL
 */
async function requestGraphQL<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables,
    options?: { token?: string, fetch?: typeof fetch }
): Promise<Result> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    const fetchfn = options?.fetch || fetch;

    if (options?.token) {
        headers.Authorization = `Bearer ${options.token}`;
    }

    const response = await fetchfn(PUBLIC_API_URL, {
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
        throw new Error(result.errors.map((error: any) => error.message).join('\n'));
    }

    return result.data as Result;
}

/**
 * Effectue une requête GraphQL côté client, en utilisant le token de session pour l'authentification.
 * @param document La requête GraphQL à exécuter
 * @param variables Les variables de la requête GraphQL
 * @returns Le résultat de la requête GraphQL
 */
export async function request<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables
): Promise<Result> {
    const sessionToken = getToken();

    return requestGraphQL(document, variables, { token: sessionToken?.token });
}

/**
 * Effectue une requête GraphQL côté serveur, en utilisant les cookies pour l'authentification.
 * @param document la requête GraphQL à exécuter
 * @param variables les variables de la requête GraphQL
 * @param event l'event contenant la fonction fetch et les cookies
 * @returns Le résultat de la requête GraphQL
 */
export async function requestServer<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables,
    event?: { fetch: typeof fetch, cookies: Cookies }
): Promise<Result> {
    const rawToken = event?.cookies.get(SESSION_TOKEN_COOKIE_NAME);

    const token = deserializeToken(rawToken)?.token;

    return requestGraphQL(document, variables, { token: token, fetch: event?.fetch });
}