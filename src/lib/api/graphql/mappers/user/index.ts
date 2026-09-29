import type { Avatar, User } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetBirthdays, GetUserByUid } from '$lib/api/graphql/queries/user';
import { UserFragment } from '$lib/api/graphql/queries/fragments/user';
import type { $tada } from 'gql.tada';
import { MajorAvatarFragment } from '../../queries/fragments/majorAvatar';
import { SchoolAvatarFragment } from '../../queries/fragments/schoolAvatar';
import { UserAvatarFragment } from '../../queries/fragments/userAvatar';

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
}

export function mapBirthdays(birthdays: ResultOf<typeof GetBirthdays>['birthdays']): Avatar[] {
    return birthdays.map(mapUserAvatar);
}
