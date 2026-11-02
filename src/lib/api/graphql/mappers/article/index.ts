import { type ResultOf, readFragment } from 'gql.tada';

import type { Article, ArticleDetail, Page } from '#lib/api/index.ts';

import type { GetArticleById, GetArticles } from '../../queries/article/index.ts';
import { CardArticleFragment } from '../../queries/fragments/cardArticle';
import { PageInfoFragment } from '../../queries/fragments/pagination';
import { mapEvent } from '../event';
import { mapGroupAvatar } from '../group';
import { mapLink } from '../link';

export function mapArticles(articles: ResultOf<typeof GetArticles>['homepage']): Page<Article> {
    const pageInfo = readFragment(PageInfoFragment, articles.pageInfo);
    return {
        items: articles.edges.map((edge) => mapArticle(edge.node)),
        pageInfo,
    };
}

function mapArticle(
    article: ResultOf<typeof GetArticles>['homepage']['edges'][number]['node'],
): Article {
    const data = readFragment(CardArticleFragment, article);
    return {
        content: data.bodyPreview,
        group: mapGroupAvatar(data.group),
        id: data.localID,
        links: data.links.map((link) => mapLink(link)),
        pictureURL: data.pictureURL,
        publishedAt: data.publishedAt,
        title: data.title,
    };
}

export function mapArticleDetail(
    article: ResultOf<typeof GetArticleById>['article'],
): ArticleDetail {
    const event = article.event ? mapEvent(article.event) : null;
    return {
        content: article.bodyHtmlSafe,
        event,
        group: mapGroupAvatar(article.group),
        id: article.localID,
        links: article.links.map((link) => mapLink(link)),
        pictureURL: article.pictureURL,
        publishedAt: article.publishedAt,
        title: article.title,
    };
}
