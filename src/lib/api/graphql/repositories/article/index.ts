import type { ArticleRepository } from "$lib/api/repositories";
import { GetArticles } from "$lib/api/graphql/queries/article";
import { request } from '$lib/api/graphql/client';
import { mapArticles } from "../../mappers/article";

export const articleRepository: ArticleRepository = {
    async getArticles(args) {
        try {
            const response = await request(GetArticles, args);
            return mapArticles(response.homepage);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching articles:', error);
            throw error;
        }
    }
}