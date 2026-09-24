import { graphql } from '$lib/api/graphql/graphql';
import { UserFragment } from '../fragments/user';
import { UserAvatarFragment } from '../fragments/userAvatar';

export const GetUserByUid = graphql(
	`
		query GetUserByUid($uid: String!) {
			user(uid: $uid) {
				...UserData
			}
		}
	`,
	[UserFragment]
);

export const GetUserAvatarByUid = graphql(
	`
		query GetUserAvatarByUid($uid: String!) {
			user(uid: $uid) {
				...UserAvatar
			}
		}
	`,
	[UserAvatarFragment]
);
