// Voici un client GraphQL minimaliste qui utilise fetch pour intéragir avec GraphQL.
// Vu que je l'ai fait de manière minimaliste, je ne sais pas si c'est la meilleure approche.
import type { TadaDocumentNode } from "gql.tada";
import { print } from "graphql";

//TODO : Remplacer la variable temporaire endpoint, par une variable dans le .env
const endpoint = "http://localhost:4000/graphql";

export async function request<Result, Variables>(
    document: TadaDocumentNode<Result, Variables>,
    variables?: Variables
): Promise<Result> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: print(document),
            variables,
        }),
    });

    const result = await response.json();

    return result.data as Result;
}