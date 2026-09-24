import type { Avatar } from '$lib/api/types';
import { readFragment, type $tada } from 'gql.tada';
import { GroupAvatarFragment } from '$lib/api/graphql/queries/fragments/groupAvatar';

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
