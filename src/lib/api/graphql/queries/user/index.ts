import { graphql } from '$lib/api/graphql/graphql';
import { UserFragment } from '../fragments/user';
import { UserAvatarFragment } from '../fragments/userAvatar';

export const GetUserByUid = graphql(
    `
        query GetUserByUid($uid: String!) {
            user(uid: $uid) {
                ...UserData
            }
        }
    `,
    [UserFragment]
);

export const GetUserAvatarByUid = graphql(
    `
        query GetUserAvatarByUid($uid: String!) {
            user(uid: $uid) {
                ...UserAvatar
            }
        }
    `,
    [UserAvatarFragment]
);

export const GetBirthdays = graphql(
    `
        query GetBirthdays($activeOnly: Boolean, $width: Int, $date: DateTime) {
            birthdays(activeOnly: $activeOnly, width: $width, now: $date) {
                ...UserAvatar
            }
        }
    `,
    [UserAvatarFragment]
);