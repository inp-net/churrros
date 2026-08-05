import type { LightUser, User } from '$lib/api';
import type { ResultOf } from '$lib/api/graphql/graphql';
import type { GetMe, GetUserByUid } from '$lib/api/graphql/queries/user';

export function mapUser(user: ResultOf<typeof GetUserByUid>['user']): User {
    return {
        uid: user.uid,
        email: user.email!, //On force le non null car c'est non null, juste vu que c'est un type scalaire gql dit que c'est nullable
        fullName: user.fullName,
        nickname: user.nickname,
        pictureURL: user.pictureURL,
        phone: user.phone,
        admin: user.admin
    };
}

export function mapLightUser(user: ResultOf<typeof GetMe>['me']): LightUser | null {
    if (!user) {
        return null;
    }
    return {
        uid: user.uid,
        admin: user.admin,
        firstName: user.firstName,
        lastName: user.lastName,
        pictureURL: user.pictureURL
    };
}