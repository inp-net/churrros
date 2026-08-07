import { graphql } from '$lib/api/graphql/graphql';
import { UserFragment } from '../fragments/user';

export const GetUserByUid = graphql(`
    query GetUserByUid($uid: String!) {
        user(uid: $uid) {   
            ...UserData
        }
    }
`, [UserFragment]

);

export const GetMe = graphql(`
    query GetMe {
        me {
            ...UserData
        }
    }
`, [UserFragment]
);