//Ce fichier permet l'initilisation de gql.tada manuellement, notamment pour définir les scalar types. Cf : https://gql-tada.0no.co/get-started/installation#initializing-gql-tada-manually
//Il faut importer tout depuis ce fichier pour que les types soient bien pris en compte par TypeScript.

import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '$lib/api/graphql/graphql-env';
import type { PaymentMethod } from '../enums';

export const graphql = initGraphQLTada<{
    introspection: introspection;
    scalars: {
        DateTime: string;
        Email: string;
        LocalID: string;
        HTML: string;
        URL: string;
        Capacity: number | "Unlimited";
        PaymentMethod: PaymentMethod;
    }
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';