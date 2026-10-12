import { readFragment, type ResultOf } from 'gql.tada';
import type { GetArticleById, GetArticles } from '../../queries/article/index.ts';
import type { Article, ArticleDetail, Page } from '#lib/api/types.d.ts';
import { PageInfoFragment } from '../../queries/fragments/pagination';
import { CardArticleFragment } from '../../queries/fragments/cardArticle';
import { mapLink } from '../link';
import { mapGroupAvatar } from '../group';
import { mapEvent } from '../event';

export function mapArticles(articles: ResultOf<typeof GetArticles>['homepage']): Page<Article> {
    const pageInfo = readFragment(PageInfoFragment, articles.pageInfo);
    return {
        items: articles.edges.map((edge) => mapArticle(edge.node)),
        pageInfo
    };
}

function mapArticle(
    article: ResultOf<typeof GetArticles>['homepage']['edges'][number]['node']
): Article {
    const data = readFragment(CardArticleFragment, article);
    return {
        id: data.localID,
        pictureURL: data.pictureURL,
        title: data.title,
        content: data.bodyPreview,
        publishedAt: data.publishedAt,
        links: data.links.map((link) => mapLink(link)),
        group: mapGroupAvatar(data.group)
    };
}

export function mapArticleDetail(
    article: ResultOf<typeof GetArticleById>['article']
): ArticleDetail {
    const event = article.event ? mapEvent(article.event) : null;
    return {
        id: article.localID,
        pictureURL: article.pictureURL,
        title: article.title,
        content: article.bodyHtmlSafe,
        publishedAt: article.publishedAt,
        links: article.links.map((link) => mapLink(link)),
        group: mapGroupAvatar(article.group),
        event
    };
}
