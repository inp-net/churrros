import { graphql } from '#lib/api/graphql/graphql.ts';
import { CardServiceFragment } from '../fragments/cardService';
import { MajorInfosFragment } from '../fragments/majorInfos';
import { SchoolAvatarFragment } from '../fragments/schoolAvatar';
import { StudentAssociationAvatar } from '../fragments/studentAssociationAvatar';

export const GetSchoolProfile = graphql(
    `
        query GetSchoolProfile($uid: String!) {
            school(uid: $uid) {
                ...SchoolAvatar
                activeStudentsCount: studentsCount(yearTiers: [1, 2, 3])
                studentsCount
                description
            }
        }
    `,
    [SchoolAvatarFragment]
);

export const GetSchoolInfos = graphql(
    `
        query GetSchoolInfos($uid: String!) {
            school(uid: $uid) {
                address
                studentAssociations {
                    ...StudentAssociationAvatar
                }
            }
        }
    `,
    [StudentAssociationAvatar]
);

export const GetSchoolMajors = graphql(
    `
        query GetSchoolMajors($uid: String!) {
            school(uid: $uid) {
                majors {
                    ...MajorInfos
                }
            }
        }
    `,
    [MajorInfosFragment]
);

export const GetSchoolServices = graphql(
    `
        query GetSchoolServices($uid: String!) {
            school(uid: $uid) {
                services {
                    ...CardService
                }
            }
        }
    `,
    [CardServiceFragment]
);
