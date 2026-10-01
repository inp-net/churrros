import type { Avatar, GroupMember } from '$lib/api/types';
import { readFragment, type $tada } from 'gql.tada';
import { GroupAvatarFragment } from '$lib/api/graphql/queries/fragments/groupAvatar';
import { GroupMemberFragment } from '$lib/api/graphql/queries/fragments/groupMember';

//Type gql.tada dans la réponse d'une query
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

type GroupMemberFragment = {
    [$tada.fragmentRefs]: {
        GroupMember: 'GroupMember';
    };
};

export function mapGroupMember(groupMember: GroupMemberFragment): GroupMember {
    const data = readFragment(GroupMemberFragment, groupMember);
    return {
        title: data.title,
        treasurer: data.treasurer,
        secretary: data.secretary,
        vicePresident: data.vicePresident,
        president: data.president,
        group: mapGroupAvatar(data.group)
    };
}