import type { SearchRepository } from '#lib/api/repositories.ts';
import { request } from '#lib/api/graphql/client.ts';
import { SearchQuery } from '#lib/api/graphql/queries/search/index.ts';
import { mapSearch } from '#lib/api/graphql/mappers/search/index.ts';

export const searchRepository: SearchRepository = {
    async search(q, only) {
        try {
            const response = await request(SearchQuery, { q, only });
            return mapSearch(response.search);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error searching:', error);
            throw error;
        }
    }
};
