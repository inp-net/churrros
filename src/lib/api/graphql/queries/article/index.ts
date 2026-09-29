import { graphql } from '$lib/api/graphql/graphql';
import { CardArticleFragment } from '../fragments/cardArticle';
import { PageInfoFragment } from '../fragments/pagination';

export const GetArticles = graphql(
    `
        query GetArticles($first: Int, $after: String) {
            homepage(first: $first, after: $after) {
                edges {
                    node {
                        ...CardArticle
                    }
                }
                pageInfo {
                    ...PageInfo
                }
            }
        }
    `,
    [CardArticleFragment, PageInfoFragment]
);
