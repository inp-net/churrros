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
    [GroupAvatarFragment, StudentAssociationAvatar, LinkFragment],
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
    [GroupMemberWithUserFragment],
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
    [GroupMemberWithUserFragment, PageInfoFragment],
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
    [GroupAvatarFragment],
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
                    __typename
                    data {
                        uid
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment],
);

export const EditGroupProfile = graphql(
    `
        mutation EditGroupProfile($uid: UID!, $profile: GroupProfileInput!) {
            updateGroupProfile(uid: $uid, profile: $profile) {
                ...MutationErrors
                ... on MutationUpdateGroupProfileSuccess {
                    __typename
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
    [MutationErrorsFragment, GroupAvatarFragment],
);

export const EditGroupJoinPolicy = graphql(
    `
        mutation EditGroupJoinPolicy($uid: UID!, $joinPolicy: GroupJoinPolicy!) {
            setGroupJoinPolicy(uid: $uid, policy: $joinPolicy) {
                ...MutationErrors
                ... on MutationSetGroupJoinPolicySuccess {
                    __typename
                    data {
                        selfJoinable
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment],
);

export const EditGroupParent = graphql(
    `
        mutation SetGroupParent($uid: UID!, $parentUid: UID) {
            setParentGroup(child: $uid, parent: $parentUid) {
                ...MutationErrors
                ... on MutationSetParentGroupSuccess {
                    __typename
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
    [MutationErrorsFragment, GroupAvatarFragment],
);

export const EditGroupStudentAssociation = graphql(
    `
        mutation SetGroupStudentAssociation($uid: UID!, $studentAssociation: UID!) {
            setGroupStudentAssociation(group: $uid, studentAssociation: $studentAssociation) {
                ...MutationErrors
                ... on MutationSetGroupStudentAssociationSuccess {
                    __typename
                    data {
                        studentAssociation {
                            ...StudentAssociationAvatar
                        }
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment, StudentAssociationAvatar],
);

export const EditGroupType = graphql(
    `
        mutation SetGroupType($uid: UID!, $type: GroupType, $unlisted: Boolean) {
            setGroupType(uid: $uid, type: $type, unlisted: $unlisted) {
                ...MutationErrors
                ... on MutationSetGroupTypeSuccess {
                    __typename
                    data {
                        type
                        unlisted
                    }
                }
            }
        }
    `,
    [MutationErrorsFragment],
);

export const GetGroupPermissions = graphql(`
    query GetGroupPermissions($uid: String!) {
        group(uid: $uid) {
            canEditDetails
            canEditJoinPolicy
            canEditParent
            canEditStudentAssociation
            canEditType
            canEditUnlisted
            canEditLydiaAccounts
        }
    }
`);

// We also fetch the conditions as they will throw errors if the user is not allowed to edit the group
export const GetGroupInfoForEdition = graphql(
    `
        query GetGroupInfoForEdition(
            $uid: String!
            $withDetails: Boolean!
            $withStudentAssociation: Boolean!
            $withParent: Boolean!
            $withJoinPolicy: Boolean!
            $withType: Boolean!
            $withUnlisted: Boolean!
            $withLydiaAccounts: Boolean!
        ) {
            group(uid: $uid) {
                ...GroupAvatar
                canEditDetails(assert: "You are not allowed to edit this group's details.")
                    @include(if: $withDetails)
                shortDescription @include(if: $withDetails)
                longDescription @include(if: $withDetails)
                color @include(if: $withDetails)
                email @include(if: $withDetails)
                address @include(if: $withDetails)
                related @include(if: $withDetails) {
                    ...GroupAvatar
                }

                canEditStudentAssociation(
                    assert: "You are not allowed to edit this group's student association."
                ) @include(if: $withStudentAssociation)
                studentAssociation @include(if: $withStudentAssociation) {
                    ...StudentAssociationAvatar
                }

                canEditParent(assert: "You are not allowed to edit this group's parent.")
                    @include(if: $withParent)
                parent @include(if: $withParent) {
                    ...GroupAvatar
                }

                canEditJoinPolicy(assert: "You are not allowed to edit this group's join policy.")
                    @include(if: $withJoinPolicy)
                selfJoinable @include(if: $withJoinPolicy)
                canEditType(assert: "You are not allowed to edit this group's type.")
                    @include(if: $withType)
                type @include(if: $withType)
                canEditUnlisted(assert: "You are not allowed to edit this group's visibility.")
                    @include(if: $withUnlisted)
                unlisted @include(if: $withUnlisted)
                canEditLydiaAccounts(
                    assert: "You are not allowed to edit this group's bank accounts."
                ) @include(if: $withLydiaAccounts)
                lydiaAccounts @include(if: $withLydiaAccounts) {
                    id
                    name
                    eventsCount
                }
            }
        }
    `,
    [GroupAvatarFragment, StudentAssociationAvatar],
);
