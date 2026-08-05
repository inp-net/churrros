import { graphql } from '$lib/api/graphql/graphql';

export const GetUserByUid = graphql(`
    query GetUserByUid($uid: String!) {
        user(uid: $uid) {   
            uid
            email
            fullName
            nickname
            pictureURL
            phone
            admin
        }
    }
`);

export const GetMe = graphql(`
    query GetMe {
        me {
            uid
            admin
            firstName
            lastName
            pictureURL
        }
    }
`);