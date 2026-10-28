import { type $tada, type ResultOf, readFragment } from 'gql.tada';

import { ApiValidationError } from '#lib/api/errors.ts';
import { GroupAvatarFragment } from '#lib/api/graphql/queries/fragments/groupAvatar.ts';
import { GroupMemberWithGroupFragment } from '#lib/api/graphql/queries/fragments/groupMemberWithGroup.ts';
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
    Page,
} from '#lib/api/index.ts';

import { MutationErrorsFragment } from '../../queries/fragments/mutationErrors';
import { PageInfoFragment } from '../../queries/fragments/pagination';
import type {
    CreateGroup,
    GetBoardGroupMembers,
    GetGroupInfoForEdition,
    GetGroupInfos,
    GetGroupMembers,
    GetGroupProfile,
    GetGroupSeeAlso,
} from '../../queries/group';
import { mapLink } from '../link';
import { mapStudentAssociationAvatar } from '../studentassociation';
import { mapGroupMemberWithUser } from '../user';

// Gql.tada fragment types
interface GroupAvatarFragment {
    [$tada.fragmentRefs]: {
        GroupAvatar: 'Group';
    };
}

export function mapGroupAvatar(groupAvatar: GroupAvatarFragment): Avatar {
    const data = readFragment(GroupAvatarFragment, groupAvatar);
    return {
        name: data.name,
        pictureURL: data.pictureURL,
        uid: data.uid,
    };
}

type GroupAvatarWithDescription = GroupAvatarFragment & {
    shortDescription: string;
};
export function mapGroupAvatarWithDescription(
    groupAvatar: GroupAvatarWithDescription,
): GroupAvatar {
    return {
        ...mapGroupAvatar(groupAvatar),
        description: groupAvatar.shortDescription,
    };
}

interface GroupMemberFragment {
    [$tada.fragmentRefs]: {
        GroupMemberGroup: 'GroupMember';
    };
}

export function mapGroupMemberGroup(groupMember: GroupMemberFragment): GroupMember {
    const data = readFragment(GroupMemberWithGroupFragment, groupMember);
    return {
        avatar: mapGroupAvatar(data.group),
        president: data.president,
        secretary: data.secretary,
        title: data.title,
        treasurer: data.treasurer,
        vicePresident: data.vicePresident,
    };
}

export function mapGroupProfile(
    groupProfile: ResultOf<typeof GetGroupProfile>['group'],
): GroupProfile {
    return {
        activeMembersCount: groupProfile.activeMembersCount,
        description: groupProfile.longDescriptionHtml,
        email: groupProfile.email,
        group: mapGroupAvatar(groupProfile),
        links: groupProfile.links.map(mapLink),
        membersCount: groupProfile.membersCount,
        selfJoinable: groupProfile.selfJoinable,
        studentAssociation: mapStudentAssociationAvatar(groupProfile.studentAssociation),
        type: groupProfile.type,
    };
}

export function mapGroupInfos(groupInfos: ResultOf<typeof GetGroupInfos>['group']): GroupInfos {
    return {
        address: groupInfos.address,
        color: groupInfos.color,
        email: groupInfos.email,
        roomIsOpen: groupInfos.roomIsOpen,
    };
}

export function mapGroupBoardMembers(
    groupBoardMembers: ResultOf<typeof GetBoardGroupMembers>['group'],
): GroupBoardMembers {
    return {
        boardMembers: groupBoardMembers.boardMembers.map(mapGroupMemberWithUser),
        membersCount: groupBoardMembers.membersCount,
    };
}

export function mapGroupSeeAlso(
    groupSeeAlso: ResultOf<typeof GetGroupSeeAlso>['group'],
): GroupSeeAlso {
    return {
        familyChildren: groupSeeAlso.familyChildren.map(mapGroupAvatarWithDescription),
        related: groupSeeAlso.related.map(mapGroupAvatarWithDescription),
    };
}

export function mapGroupMembers(
    groupMembers: ResultOf<typeof GetGroupMembers>['group']['members'],
): Page<GroupMemberByDate> {
    const pageInfo = readFragment(PageInfoFragment, groupMembers.pageInfo);
    return {
        items: groupMembers.edges.map((edge) => mapGroupMembersByDate(edge.node)),
        pageInfo,
    };
}

export function mapGroupMembersByDate(
    groupMembers: ResultOf<typeof GetGroupMembers>['group']['members']['edges'][number]['node'],
): GroupMemberByDate {
    return {
        ...mapGroupMemberWithUser(groupMembers),
        createdAt: groupMembers.createdAt,
    };
}

export function mapCreateGroup(result: ResultOf<typeof CreateGroup>['createGroup']): string {
    switch (result.__typename) {
        case 'Error': {
            const errorsFragment = readFragment(MutationErrorsFragment, result);
            throw new Error(errorsFragment.message);
        }
        case 'ZodError': {
            const zodErrorsFragment = readFragment(MutationErrorsFragment, result);
            throw new ApiValidationError(zodErrorsFragment.fieldErrors);
        }
        case 'MutationCreateGroupSuccess': {
            return result.data.uid;
        }
        default: {
            throw new Error('Unknown error while creating group');
        }
    }
}

export function mapGroupEditInfo(
    result: ResultOf<typeof GetGroupInfoForEdition>['group'],
): GroupEditInfo {
    const avatar = readFragment(GroupAvatarFragment, result);
    return {
        accounts:
            result.lydiaAccounts?.map((account) => ({
                eventsCount: account.eventsCount,
                id: account.id,
                name: account.name,
            })) ?? [],
        address: result.address,
        avatar,
        color: result.color,
        email: result.email,
        longDescription: result.longDescription,
        parent: result.parent ? mapGroupAvatar(result.parent) : undefined,
        relatedGroups: result.related?.map(mapGroupAvatar) ?? [],
        selfJoinable: result.selfJoinable,
        shortDescription: result.shortDescription,
        studentAssociation: result.studentAssociation
            ? mapStudentAssociationAvatar(result.studentAssociation)
            : undefined,
        type: result.type,
        unlisted: result.unlisted,
    };
}
