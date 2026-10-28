import { graphql } from '#lib/api/graphql/graphql.ts';

import { CardEventFragment } from '../fragments/cardEvent';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { UserAvatarFragment } from '../fragments/userAvatar';

export const SearchQuery = graphql(
    `
        query SearchQuery($q: String, $only: [SearchableResources!]!) {
            search(q: $q, only: $only) {
                __typename
                ... on EventSearchResult {
                    id
                    rank
                    similarity
                    event {
                        ...CardEvent
                    }
                }
                ... on GroupSearchResult {
                    id
                    rank
                    similarity
                    group {
                        ...GroupAvatar
                    }
                }
                ... on UserSearchResult {
                    id
                    similarity
                    rank
                    user {
                        ...UserAvatar
                    }
                }
            }
        }
    `,
    [UserAvatarFragment, GroupAvatarFragment, CardEventFragment],
);
