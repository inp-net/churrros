import type { User } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetMe, GetUserByUid } from '$lib/api/graphql/queries/user';
import { UserFragment } from '$lib/api/graphql/queries/fragments/user';

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

export function mapMe(user: ResultOf<typeof GetMe>['me']): User | null {
    if (!user) {
        return null;
    }
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