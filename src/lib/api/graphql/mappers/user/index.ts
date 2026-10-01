import type { Avatar, User, UserFamily, UserGroups, UserInfos } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetUserByUid, GetUserFamily, GetUserGroups, GetUserInfos } from '$lib/api/graphql/queries/user';
import { UserFragment } from '$lib/api/graphql/queries/fragments/user';
import type { $tada } from 'gql.tada';
import { MajorAvatarFragment } from '../../queries/fragments/majorAvatar';
import { SchoolAvatarFragment } from '../../queries/fragments/schoolAvatar';
import { UserAvatarFragment } from '../../queries/fragments/userAvatar';
import { mapStudentAssociationAvatar } from '../studentassociation';
import { mapGroupMember } from '../group';

export function mapUser(user: ResultOf<typeof GetUserByUid>['user']): User {
    const userData = readFragment(UserFragment, user);
    return {
        uid: userData.uid,
        email: userData.email!,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname,
        pictureURL: userData.pictureURL,
        phone: userData.phone,
        admin: userData.admin
    };
}

type MajorFragmentType = {
    [$tada.fragmentRefs]: {
        MajorAvatar: 'Major';
    };
};

export function mapMajor(major: MajorFragmentType): Avatar {
    const data = readFragment(MajorAvatarFragment, major);
    return {
        uid: data.uid,
        name: data.name,
        pictureURL: data.pictureURL
    };
}

type SchoolFragmentType = {
    [$tada.fragmentRefs]: {
        SchoolAvatar: 'School';
    };
};

export function mapSchool(school: SchoolFragmentType): Avatar {
    const data = readFragment(SchoolAvatarFragment, school);
    return {
        uid: data.uid,
        name: data.name,
        pictureURL: data.pictureURL
    };
}

type UserAvatarFragmentType = {
    [$tada.fragmentRefs]: {
        UserAvatar: 'User';
    };
};
export function mapUserAvatar(user: UserAvatarFragmentType): Avatar {
    const data = readFragment(UserAvatarFragment, user);
    return {
        uid: data.uid,
        name: data.fullName,
        pictureURL: data.pictureURL
    };
};

export function mapUserInfos(user: ResultOf<typeof GetUserInfos>['user']): UserInfos {
    return {
        uid: user.uid,
        address: user.address,
        nickname: user.nickname,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email!,
        otherEmails: user.otherEmails ? user.otherEmails : [],
        contributesTo: user.contributesTo ? user.contributesTo.map(avatar => mapStudentAssociationAvatar(avatar)) : null
    };
}

export function mapUserGroups(user: ResultOf<typeof GetUserGroups>['user']): UserGroups {
    return {
        uid: user.uid,
        groups: user.groups.map(group => mapGroupMember(group))
    };
};

export function mapUserFamily(user: ResultOf<typeof GetUserFamily>['user']): UserFamily {
    return {
        uid: user.uid,
        nesting: user.familyTree.nesting,
        users: user.familyTree.users.map(user => mapUserAvatar(user))
    };
};