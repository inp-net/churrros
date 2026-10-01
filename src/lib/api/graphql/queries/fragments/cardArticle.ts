import { graphql } from '$lib/api/graphql/graphql';
import { GroupAvatarFragment } from './groupAvatar';
import { LinkFragment } from './link';

export const CardArticleFragment = graphql(
    `
        fragment CardArticle on Article {
            localID
            title
            bodyPreview
            publishedAt
            pictureURL
            links {
                ...Link
            }
            group {
                ...GroupAvatar
            }
        }
    `,
    [LinkFragment, GroupAvatarFragment]
);