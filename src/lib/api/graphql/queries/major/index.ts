import { graphql } from '$lib/api/graphql/graphql';
import { MajorInfosFragment } from '../fragments/majorInfos';

export const GetMajorProfile = graphql(
    `
        query GetMajorProfile($uid: String!) {
            major(uid: $uid) {
                ...MajorInfos
            }
        }
    `, [MajorInfosFragment]
);