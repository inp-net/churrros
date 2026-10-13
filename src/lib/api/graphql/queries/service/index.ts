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
    [CardServiceFragment]
);
