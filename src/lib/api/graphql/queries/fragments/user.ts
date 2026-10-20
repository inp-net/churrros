import { graphql } from '#lib/api/graphql/graphql.ts';

export const UserFragment = graphql(`
    fragment UserData on User {
        uid
        email
        firstName
        lastName
        nickname
        pictureURL
        phone
        lydiaPhone
        admin
    }
`);
