import { graphql } from '#lib/api/graphql/graphql.ts';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { GroupMemberWithUserFragment } from '../fragments/groupMemberWithUser';
import { LinkFragment } from '../fragments/link';
import { MutationErrorsFragment } from '../fragments/mutationErrors';
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

export const CreateGroup = graphql(
    `
        mutation CreateGroup(
            $studentAssociation: UID!
            $uid: UID!
            $name: String!
            $type: GroupType!
        ) {
            createGroup(
                studentAssociation: $studentAssociation
                uid: $uid
                name: $name
                type: $type
            ) {
                ...MutationErrors
                ... on MutationCreateGroupSuccess {
                    data {
                        uid
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment]
);

export const EditGroupProfile = graphql(
    `
        mutation EditGroupProfile($uid: UID!, $profile: GroupProfileInput!) {
            updateGroupProfile(uid: $uid, profile: $profile) {
                ...MutationErrors
                ... on MutationUpdateGroupProfileSuccess {
                    data {
                        name
                        shortDescription
                        longDescription
                        longDescriptionHtml
                        related {
                            ...GroupAvatar
                        }
                        email
                        address
                        color
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment, GroupAvatarFragment]
);

export const EditGroupJoinPolicy = graphql(
    `
        mutation EditGroupJoinPolicy($uid: UID!, $joinPolicy: GroupJoinPolicy!) {
            setGroupJoinPolicy(uid: $uid, policy: $joinPolicy) {
                ...MutationErrors
                ... on MutationSetGroupJoinPolicySuccess {
                    data {
                        selfJoinable
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment]
);

export const EditGroupParent = graphql(
    `
        mutation SetGroupParent($uid: UID!, $parentUid: UID) {
            setParentGroup(child: $uid, parent: $parentUid) {
                ...MutationErrors
                ... on MutationSetParentGroupSuccess {
                    data {
                        parent {
                            ...GroupAvatar
                        }
                        root {
                            ...GroupAvatar
                        }
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment, GroupAvatarFragment]
);

export const EditGroupStudentAssociation = graphql(
    `
        mutation SetGroupStudentAssociation($uid: UID!, $studentAssociation: UID!) {
            setGroupStudentAssociation(group: $uid, studentAssociation: $studentAssociation) {
                ...MutationErrors
                ... on MutationSetGroupStudentAssociationSuccess {
                    data {
                        studentAssociation {
                            ...StudentAssociationAvatar
                        }
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment, StudentAssociationAvatar]
);

export const EditGroupType = graphql(
    `
        mutation SetGroupType($uid: UID!, $type: GroupType, $unlisted: Boolean) {
            setGroupType(uid: $uid, type: $type, unlisted: $unlisted) {
                ...MutationErrors
                ... on MutationSetGroupTypeSuccess {
                    data {
                        type
                        unlisted
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment]
);
