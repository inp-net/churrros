import { graphql } from '#lib/api/graphql/graphql.ts';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { GroupMemberWithUserFragment } from '../fragments/groupMemberWithUser';
import { LinkFragment } from '../fragments/link';
import { PageInfoFragment } from '../fragments/pagination';
import { StudentAssociationAvatar } from '../fragments/studentAssociationAvatar';

export const GetGroupProfile = graphql(
    `
        query GetGroupProfile($uid: String!) {
            group(uid: $uid) {
                ...GroupAvatar
                email
                type
                longDescriptionHtml
                links {
                    ...Link
                }
                membersCount
                activeMembersCount: membersCount(yearTiers: [1, 2, 3])
                studentAssociation {
                    ...StudentAssociationAvatar
                }
                selfJoinable
            }
        }
    `,
    [GroupAvatarFragment, StudentAssociationAvatar, LinkFragment]
);

export const GetBoardGroupMembers = graphql(
    `
        query GetBoardGroupMembers($uid: String!) {
            group(uid: $uid) {
                membersCount
                boardMembers {
                    ...GroupMemberUser
                }
            }
        }
    `,
    [GroupMemberWithUserFragment]
);

export const GetGroupMembers = graphql(
    `
        query GetGroupMembers($uid: String!, $first: Int, $after: String) {
            group(uid: $uid) {
                members(first: $first, after: $after) {
                    edges {
                        node {
                            createdAt
                            ...GroupMemberUser
                        }
                    }
                    pageInfo {
                        ...PageInfo
                    }
                }
            }
        }
    `,
    [GroupMemberWithUserFragment, PageInfoFragment]
);

export const GetGroupInfos = graphql(`
    query GetGroupInfos($uid: String!) {
        group(uid: $uid) {
            roomIsOpen
            address
            color
            email
        }
    }
`);

export const GetGroupSeeAlso = graphql(
    `
        query GetGroupSeeAlso($uid: String!) {
            group(uid: $uid) {
                familyChildren {
                    ...GroupAvatar
                    shortDescription
                }
                related {
                    ...GroupAvatar
                    shortDescription
                }
            }
        }
    `,
    [GroupAvatarFragment]
);
