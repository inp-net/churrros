import { graphql } from '#lib/api/graphql/graphql.ts';
import { CardServiceFragment } from '../fragments/cardService';
import { GroupAvatarFragment } from '../fragments/groupAvatar';
import { LinkFragment } from '../fragments/link';
import { PageInfoFragment } from '../fragments/pagination';
import { SchoolAvatarFragment } from '../fragments/schoolAvatar';
import { StudentAssociationAvatar } from '../fragments/studentAssociationAvatar';

export const GetStudentAssociationProfile = graphql(
    `
        query GetStudentAssociationProfile($id: String!) {
            studentAssociation(uid: $id) {
                ...StudentAssociationAvatar
                email
                descriptionHtml
                activeMembersCount: studentsCount(yearTiers: [1, 2, 3])
                membersCount: studentsCount
                links {
                    ...Link
                }
                school {
                    ...SchoolAvatar
                }
            }
        }
    `,
    [StudentAssociationAvatar, LinkFragment, SchoolAvatarFragment]
);

export const GetStudentAssociationGroups = graphql(
    `
        query GetStudentAssociationGroups(
            $id: String!
            $types: [GroupType!]
            $first: Int
            $after: String
        ) {
            studentAssociation(uid: $id) {
                groups(types: $types, first: $first, after: $after) {
                    edges {
                        node {
                            ...GroupAvatar
                            shortDescription
                        }
                    }
                    pageInfo {
                        ...PageInfo
                    }
                }
            }
        }
    `,
    [GroupAvatarFragment, PageInfoFragment]
);

export const GetStudentAssociationServices = graphql(
    `
        query GetStudentAssociationServices($id: String!, $first: Int, $after: String) {
            studentAssociation(uid: $id) {
                services(first: $first, after: $after) {
                    edges {
                        node {
                            ...CardService
                        }
                    }
                    pageInfo {
                        ...PageInfo
                    }
                }
            }
        }
    `,
    [CardServiceFragment, PageInfoFragment]
);
