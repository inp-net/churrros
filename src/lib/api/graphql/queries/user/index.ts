import { graphql } from '$lib/api/graphql/graphql';
import { GroupMemberFragment } from '../fragments/groupMember';
import { LinkFragment } from '../fragments/link';
import { MajorAvatarFragment } from '../fragments/majorAvatar';
import { SchoolAvatarFragment } from '../fragments/schoolAvatar';
import { StudentAssociationAvatar } from '../fragments/studentAssociationAvatar';
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

export const GetUserProfile = graphql(
    `
        query GetUserProfile($uid: String!) {
            user(uid: $uid) {
                ...UserAvatar
                fullName
                pronouns
                nickname
                descriptionHtml
                yearTier
                major {
                    ...MajorAvatar
                    schools {
                        ...SchoolAvatar
                    }
                }
                links {
                    ...Link
                }
                bot
                admin
                studentAssociationAdmin
            }
        }
    `,
    [UserAvatarFragment, MajorAvatarFragment, SchoolAvatarFragment, LinkFragment]
);

export const GetUserInfos = graphql(
    `
        query GetUserInfos($uid: String!) {
            user(uid: $uid) {
                uid
                address
                nickname
                birthday
                phone
                email
                otherEmails
                contributesTo {
                    ...StudentAssociationAvatar
                }
            }
        }
    `,
    [StudentAssociationAvatar]
);

export const GetUserGroups = graphql(
    `
        query GetUserGroups($uid: String!) {
            user(uid: $uid) {
                uid
                groups {
                    ...GroupMember
                }
            }
        }
    `,
    [GroupMemberFragment]
);

export const GetUserFamily = graphql(
    `
        query GetUserFamily($uid: String!) {
            user(uid: $uid) {
                uid
                familyTree {
                    nesting
                    users {
                        ...UserAvatar
                    }
                }
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

export const GetGroupedBirthdays = graphql(
    `
        query GetGroupedBirthdays($activeOnly: Boolean, $width: Int, $date: DateTime) {
            birthdays(activeOnly: $activeOnly, width: $width, now: $date) {
                birthday
                ...UserAvatar
            }
        }
    `,
    [UserAvatarFragment]
);
