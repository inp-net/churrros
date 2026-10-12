import { graphql } from '#lib/api/graphql/graphql.ts';

export const CardServiceFragment = graphql(`
    fragment CardService on Service {
        name
        url
        description
        localID
        logo
        pinned
    }
`);
