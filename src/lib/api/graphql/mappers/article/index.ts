import { readFragment, type ResultOf } from "gql.tada";
import type { GetArticles } from "../../queries/article";
import type { Article, Page } from "$lib/api/types";
import { PageInfoFragment } from "../../queries/fragments/pagination";
import { CardArticleFragment } from "../../queries/fragments/cardArticle";
import { mapLink } from "../link";
import { mapGroupAvatar } from "../group";

export function mapArticles(articles: ResultOf<typeof GetArticles>['homepage']): Page<Article> {
    const pageInfo = readFragment(PageInfoFragment, articles.pageInfo);
    return {
        items: articles.edges.map((edge) => mapArticle(edge.node)),
        pageInfo
    };
}

function mapArticle(article: ResultOf<typeof GetArticles>['homepage']['edges'][number]['node']): Article {
    const data = readFragment(CardArticleFragment, article);
    return {
        id: data.localID,
        pictureURL: data.pictureURL,
        title: data.title,
        contentPreview: data.bodyPreview,
        publishedAt: data.publishedAt,
        links: data.links.map((link) => mapLink(link)),
        group: mapGroupAvatar(data.group)
    };
}