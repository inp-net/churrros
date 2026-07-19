// Pour vraiment profiter de gql.tada il faut mettre les requetes dans les fichiers .ts et pas dans des fichiers .svelte
// Actuellement je propose de mettre dans ce fichiers les requetes, mais il faut voir avec l'évolution du projet si on garde cette approche ou pas.

import { graphql } from "gql.tada";

export const TEST_EVENTS_QUERY = graphql(`
    query TestEvents 
    {
        events {
            edges {
                node {
                    id
                    slug
                    title
                    coOrganizers {
                        id
                        name
                    }
                }
            }
        }
    }
`);

//Test sur les fragments
export const CardArticleFragment = graphql(`
  fragment CardArticle on Article {
    id
    localID
    title
    bodyPreview
    publishedAt
    pictureURL
    liked: reacted(emoji: "❤️")
    likes: reactions(emoji: "❤️")
    links {
      computedValue
      name
    }
    group {
      uid
      name
      pictureFile
      pictureFileDark
    }
    author {
      uid
      fullName
      pictureURL
    }
    event {
      title
      localID
      pictureURL
      location
      startsAt
      endsAt
      frequency
      recurringUntil
    }
  }
`);

export const PAGE_HOME_FEED_QUERY = graphql(
    `
    query PageHomeFeed {
      homepage(first: 5) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            uid
            group {
              uid
            }
            ...CardArticle
          }
        }
      }
    }
  `,
    [CardArticleFragment],
);