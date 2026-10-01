import type { ArticleRepository } from "$lib/api/repositories";
import { GetArticleById, GetArticles } from "$lib/api/graphql/queries/article";
import { request } from '$lib/api/graphql/client';
import { mapArticleDetail, mapArticles } from "../../mappers/article";

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
    },
    async getArticleById(id) {
        try {
            if (!id) {
                throw new Error('Article ID is undefined');
            }
            const response = await request(GetArticleById, { id });
            return mapArticleDetail(response.article);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching article by id:', error);
            throw error;
        }
    }
}