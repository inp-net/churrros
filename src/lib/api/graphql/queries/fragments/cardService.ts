import { graphql } from '$lib/api/graphql/graphql';

export const CardServiceFragment = graphql(
    `
        fragment CardService on Service {
            name
            url
            description
            localID
            logo
            pinned
        }
    `
);