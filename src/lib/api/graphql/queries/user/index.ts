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