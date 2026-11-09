import { graphql } from '#lib/api/graphql/graphql.ts';

import { CardServiceFragment } from '../fragments/cardService';
import { MutationErrorsFragment } from '../fragments/mutationErrors';

export const GetServices = graphql(
    `
        query GetServices($mine: Boolean!) {
            services(mine: $mine) {
                ...CardService
            }
        }
    `,
    [CardServiceFragment],
);

export const UpsertService = graphql(
    `
        mutation UpsertService($input: ServiceInput!, $id: LocalID) {
            upsertServiceV2(id: $id, input: $input) {
                ...MutationErrors
            }
        }
    `,
    [MutationErrorsFragment],
);

export const GetServiceInfo = graphql(
    `
        query GetServiceInfo($id: LocalID!) {
            service(id: $id) {
                name
                description
                url
                importance
                hidden
                logo
                owner {
                    __typename
                    ... on School {
                        uid
                    }
                    ... on Group {
                        uid
                    }
                    ... on StudentAssociation {
                        uid
                    }
                }
            }
        }
    `,
    [],
);
