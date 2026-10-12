import { readFragment, type ResultOf } from '#lib/api/graphql/graphql.ts';
import type { SearchResult } from '#lib/api/types.ts';
import type { SearchQuery } from '#lib/api/graphql/queries/search/index.ts';
import { mapUserAvatar } from '../user';
import { mapGroupAvatar } from '../group';
import { mapEvent } from '../event';

export function mapSearch(result: ResultOf<typeof SearchQuery>['search']): SearchResult[] {
    return result.map(mapSearchResult);
}

export function mapSearchResult(
    result: ResultOf<typeof SearchQuery>['search'][number]
): SearchResult {
    switch (result.__typename) {
        case 'UserSearchResult':
            return {
                id: result.id,
                rank: result.rank,
                type: 'Users',
                similarity: result.similarity,
                content: mapUserAvatar(result.user)
            };
        case 'GroupSearchResult':
            return {
                id: result.id,
                rank: result.rank,
                type: 'Groups',
                similarity: result.similarity,
                content: mapGroupAvatar(result.group)
            };
        case 'EventSearchResult':
            return {
                id: result.id,
                rank: result.rank,
                type: 'Events',
                similarity: result.similarity,
                content: mapEvent(result.event)
            };
        default:
            throw new Error(`Unknown search result type: ${result.__typename}`);
    }
}
