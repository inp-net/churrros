// This file allows manual initialization of gql.tada, especially to define scalar types. See: https://gql-tada.0no.co/get-started/installation#initializing-gql-tada-manually
// You must import everything from this file for the types to be properly recognized by TypeScript.

import { initGraphQLTada } from 'gql.tada';

import type { introspection } from '#lib/api/graphql/graphql-env.d.ts';

export const graphql = initGraphQLTada<{
    introspection: introspection;
    scalars: {
        DateTime: string;
        Email: string;
        LocalID: string;
        HTML: string;
        URL: string;
        Capacity: number | 'Unlimited';
        Color: string;
    };
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';
