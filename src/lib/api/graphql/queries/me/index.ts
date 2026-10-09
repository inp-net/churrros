import { graphql } from '#lib/api/graphql/graphql.ts';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { UserFragment } from '../fragments/user';

export const GetMe = graphql(
    `
        query GetMe {
            me {
                ...UserData
            }
        }
    `,
    [UserFragment]
);

export const GetCanCreateEventsOn = graphql(
    `
        query GetCanCreateEventsOn {
            me {
                canCreateEventsOn {
                    ...GroupAvatar
                }
            }
        }
    `,
    [GroupAvatarFragment]
);

export const RememberPaymentPhone = graphql(`
    mutation RememberPaymentPhone($phone: String!) {
        saveLydiaPhoneNumber(phoneNumber: $phone) {
            ... on MutationSaveLydiaPhoneNumberSuccess {
                data {
                    lydiaPhone
                }
            }
            ... on Error {
                message
            }
        }
    }
`);
