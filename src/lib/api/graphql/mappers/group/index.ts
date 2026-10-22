import type {
    Avatar,
    GroupAvatar,
    GroupBoardMembers,
    GroupEditInfo,
    GroupInfos,
    GroupMember,
    GroupMemberByDate,
    GroupProfile,
    GroupSeeAlso,
    Page
} from '#lib/api/types.ts';
import { readFragment, type $tada, type FragmentOf, type ResultOf } from 'gql.tada';
import { GroupAvatarFragment } from '#lib/api/graphql/queries/fragments/groupAvatar.ts';
import { GroupMemberWithGroupFragment } from '#lib/api/graphql/queries/fragments/groupMemberWithGroup.ts';
import type {
    CreateGroup,
    GetBoardGroupMembers,
    GetGroupInfoForEdition,
    GetGroupInfos,
    GetGroupMembers,
    GetGroupProfile,
    GetGroupSeeAlso
} from '../../queries/group';
import { mapLink } from '../link';
import { mapStudentAssociationAvatar } from '../studentassociation';
import { mapGroupMemberWithUser } from '../user';
import { PageInfoFragment } from '../../queries/fragments/pagination';
import { MutationErrorsFragment } from '../../queries/fragments/mutationErrors';
import { ApiValidationError } from '#lib/api/errors.ts';

// Gql.tada fragment types
type GroupAvatarFragment = {
    [$tada.fragmentRefs]: {
        GroupAvatar: 'Group';
    };
};

export function mapGroupAvatar(groupAvatar: GroupAvatarFragment): Avatar {
    const data = readFragment(GroupAvatarFragment, groupAvatar);
    return {
        name: data.name,
        uid: data.uid,
        pictureURL: data.pictureURL
    };
}

type GroupAvatarWithDescription = GroupAvatarFragment & {
    shortDescription: string;
};
export function mapGroupAvatarWithDescription(
    groupAvatar: GroupAvatarWithDescription
): GroupAvatar {
    return {
        ...mapGroupAvatar(groupAvatar),
        description: groupAvatar.shortDescription
    };
}

type GroupMemberFragment = {
    [$tada.fragmentRefs]: {
        GroupMemberGroup: 'GroupMember';
    };
};

export function mapGroupMemberGroup(groupMember: GroupMemberFragment): GroupMember {
    const data = readFragment(GroupMemberWithGroupFragment, groupMember);
    return {
        title: data.title,
        treasurer: data.treasurer,
        secretary: data.secretary,
        vicePresident: data.vicePresident,
        president: data.president,
        avatar: mapGroupAvatar(data.group)
    };
}

export function mapGroupProfile(
    groupProfile: ResultOf<typeof GetGroupProfile>['group']
): GroupProfile {
    return {
        group: mapGroupAvatar(groupProfile),
        email: groupProfile.email,
        type: groupProfile.type,
        description: groupProfile.longDescriptionHtml,
        links: groupProfile.links.map(mapLink),
        membersCount: groupProfile.membersCount,
        activeMembersCount: groupProfile.activeMembersCount,
        studentAssociation: mapStudentAssociationAvatar(groupProfile.studentAssociation),
        selfJoinable: groupProfile.selfJoinable
    };
}

export function mapGroupInfos(groupInfos: ResultOf<typeof GetGroupInfos>['group']): GroupInfos {
    return {
        roomIsOpen: groupInfos.roomIsOpen,
        address: groupInfos.address,
        color: groupInfos.color,
        email: groupInfos.email
    };
}

export function mapGroupBoardMembers(
    groupBoardMembers: ResultOf<typeof GetBoardGroupMembers>['group']
): GroupBoardMembers {
    return {
        membersCount: groupBoardMembers.membersCount,
        boardMembers: groupBoardMembers.boardMembers.map(mapGroupMemberWithUser)
    };
}

export function mapGroupSeeAlso(
    groupSeeAlso: ResultOf<typeof GetGroupSeeAlso>['group']
): GroupSeeAlso {
    return {
        familyChildren: groupSeeAlso.familyChildren.map(mapGroupAvatarWithDescription),
        related: groupSeeAlso.related.map(mapGroupAvatarWithDescription)
    };
}

export function mapGroupMembers(
    groupMembers: ResultOf<typeof GetGroupMembers>['group']['members']
): Page<GroupMemberByDate> {
    const pageInfo = readFragment(PageInfoFragment, groupMembers.pageInfo);
    return {
        items: groupMembers.edges.map((edge) => mapGroupMembersByDate(edge.node)),
        pageInfo
    };
}

export function mapGroupMembersByDate(
    groupMembers: ResultOf<typeof GetGroupMembers>['group']['members']['edges'][number]['node']
): GroupMemberByDate {
    return {
        ...mapGroupMemberWithUser(groupMembers),
        createdAt: groupMembers.createdAt
    };
}

export function mapCreateGroup(result: ResultOf<typeof CreateGroup>['createGroup']): string {
    switch (result.__typename) {
        case 'Error':
            const errorsFragment = readFragment(MutationErrorsFragment, result);
            throw new Error(errorsFragment.message);
        case 'ZodError':
            const zodErrorsFragment = readFragment(MutationErrorsFragment, result);
            throw new ApiValidationError(zodErrorsFragment.fieldErrors);
        case 'MutationCreateGroupSuccess':
            return result.data.uid;
        default:
            throw new Error('Unknown error while creating group');
    }
}

export function mapGroupEditInfo(
    result: ResultOf<typeof GetGroupInfoForEdition>['group']
): GroupEditInfo {
    const avatar = readFragment(GroupAvatarFragment, result);
    return {
        avatar: avatar,
        shortDescription: result.shortDescription,
        longDescription: result.longDescription,
        email: result.email,
        color: result.color,
        address: result.address,
        relatedGroups: result.related?.map(mapGroupAvatar) ?? [],

        studentAssociation: result.studentAssociation
            ? mapStudentAssociationAvatar(result.studentAssociation)
            : undefined,

        parent: result.parent ? mapGroupAvatar(result.parent) : undefined,

        selfJoinable: result.selfJoinable,
        type: result.type,
        unlisted: result.unlisted,
        accounts:
            result.lydiaAccounts?.map((account) => ({
                id: account.id,
                name: account.name,
                eventsCount: account.eventsCount
            })) ?? []
    };
}
