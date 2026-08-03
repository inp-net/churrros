// Voici un client GraphQL minimaliste qui utilise fetch pour intéragir avec GraphQL.
// Vu que je l'ai fait de manière minimaliste, je ne sais pas si c'est la meilleure approche.
import type { TadaDocumentNode } from 'gql.tada';
import { print } from 'graphql';
import { PUBLIC_API_URL } from '$env/static/public';
import { getToken } from '$lib/auth/session';

export async function request<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables
): Promise<Result> {
    const sessionToken = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

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
        throw new Error(result.errors.map((error: any) => error.message).join('\n'));
    }

    return result.data as Result;
}
