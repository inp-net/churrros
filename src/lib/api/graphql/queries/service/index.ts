import { graphql } from '#lib/api/graphql/graphql.ts';

import { CardServiceFragment } from '../fragments/cardService';

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

export const CreateService = graphql(`
    mutation CreateService($input: ServiceInput!) {
        upsertServiceV2(input: $input) {
            __typename
        }
    }
`);
