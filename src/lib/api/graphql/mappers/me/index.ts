import { type ResultOf, readFragment } from '#lib/api/graphql/graphql.ts';
import { UserFragment } from '#lib/api/graphql/queries/fragments/user.ts';
import type { GetMe, RememberPaymentPhone } from '#lib/api/graphql/queries/me/index.ts';
import type { User } from '#lib/api/index.ts';

export function mapMe(user: ResultOf<typeof GetMe>['me']): User | null {
    if (!user) {
        return null;
    }
    const userData = readFragment(UserFragment, user);
    return {
        admin: userData.admin,
        email: userData.email!,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname,
        paymentPhone: userData.lydiaPhone,
        phone: userData.phone,
        pictureURL: userData.pictureURL,
        uid: userData.uid,
    };
}

export function mapRememberPaymentPhone(
    data: ResultOf<typeof RememberPaymentPhone>['saveLydiaPhoneNumber'],
): string | null {
    switch (data.__typename) {
        case 'Error': {
            throw new Error(data.message);
        }
        case 'MutationSaveLydiaPhoneNumberSuccess': {
            return data.data.lydiaPhone;
        }
        default: {
            throw new Error('Unknown response type');
        }
    }
}
