import type { User } from '$lib/api';
import { readFragment, type ResultOf } from '$lib/api/graphql/graphql';
import type { GetMe, RememberPaymentPhone } from '$lib/api/graphql/queries/me';
import { UserFragment } from '$lib/api/graphql/queries/fragments/user';

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
        paymentPhone: userData.lydiaPhone,
        admin: userData.admin
    };
}

export function mapRememberPaymentPhone(data: ResultOf<typeof RememberPaymentPhone>['saveLydiaPhoneNumber']): string | null {
    switch (data.__typename) {
        case "Error":
            throw new Error(data.message);
        case "MutationSaveLydiaPhoneNumberSuccess":
            return data.data.lydiaPhone;
        default:
            throw new Error("Unknown response type");
    }
}