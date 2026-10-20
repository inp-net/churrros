import { graphql } from '#lib/api/graphql/graphql.ts';
import { GroupMemberWithGroupFragment } from '../fragments/groupMemberWithGroup.ts';
import { LinkFragment } from '../fragments/link.ts';
import { MajorAvatarFragment } from '../fragments/majorAvatar.ts';
import { SchoolAvatarFragment } from '../fragments/schoolAvatar.ts';
import { StudentAssociationAvatar } from '../fragments/studentAssociationAvatar.ts';
import { UserFragment } from '../fragments/user.ts';
import { UserAvatarFragment } from '../fragments/userAvatar.ts';

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
                groups {
                    ...GroupMemberGroup
                }
            }
        }
    `,
    [GroupMemberWithGroupFragment]
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
