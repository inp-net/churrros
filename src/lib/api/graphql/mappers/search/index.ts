import type { ResultOf } from '#lib/api/graphql/graphql.ts';
import type { SearchQuery } from '#lib/api/graphql/queries/search/index.ts';
import type { SearchResult } from '#lib/api/types.ts';

import { mapEvent } from '../event';
import { mapGroupAvatar } from '../group';
import { mapUserAvatar } from '../user';

export function mapSearch(result: ResultOf<typeof SearchQuery>['search']): SearchResult[] {
    return result.map(mapSearchResult);
}

export function mapSearchResult(
    result: ResultOf<typeof SearchQuery>['search'][number],
): SearchResult {
    switch (result.__typename) {
        case 'UserSearchResult': {
            return {
                content: mapUserAvatar(result.user),
                id: result.id,
                rank: result.rank,
                similarity: result.similarity,
                type: 'Users',
            };
        }
        case 'GroupSearchResult': {
            return {
                content: mapGroupAvatar(result.group),
                id: result.id,
                rank: result.rank,
                similarity: result.similarity,
                type: 'Groups',
            };
        }
        case 'EventSearchResult': {
            return {
                content: mapEvent(result.event),
                id: result.id,
                rank: result.rank,
                similarity: result.similarity,
                type: 'Events',
            };
        }
        default: {
            throw new Error(`Unknown search result type: ${result.__typename}`);
        }
    }
}
