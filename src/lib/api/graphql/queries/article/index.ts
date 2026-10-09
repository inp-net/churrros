import { graphql } from '#lib/api/graphql/graphql.ts';
import { CardArticleFragment } from '../fragments/cardArticle.ts';
import { CardEventFragment } from '../fragments/cardEvent.ts';
import { GroupAvatarFragment } from '../fragments/groupAvatar.ts';
import { LinkFragment } from '../fragments/link.ts';
import { PageInfoFragment } from '../fragments/pagination.ts';

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

export const GetArticleById = graphql(
    `
        query GetArticleById($id: LocalID!) {
            article(id: $id) {
                localID
                title
                bodyHtmlSafe
                publishedAt
                pictureURL
                links {
                    ...Link
                }
                group {
                    ...GroupAvatar
                }
                event {
                    ...CardEvent
                }
            }
        }
    `,
    [LinkFragment, GroupAvatarFragment, CardEventFragment]
);
