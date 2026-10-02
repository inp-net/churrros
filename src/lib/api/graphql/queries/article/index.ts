import { graphql } from '$lib/api/graphql/graphql';
import { CardArticleFragment } from '../fragments/cardArticle';
import { CardEventFragment } from '../fragments/cardEvent';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { LinkFragment } from '../fragments/link';
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
