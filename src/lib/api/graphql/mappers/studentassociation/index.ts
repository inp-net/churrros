import { type $tada, type ResultOf, readFragment } from 'gql.tada';

import type {
    Avatar,
    CardService,
    GroupAvatar,
    Page,
    StudentAssociationProfile,
} from '#lib/api/index.ts';

import { PageInfoFragment } from '../../queries/fragments/pagination';
import { StudentAssociationAvatar } from '../../queries/fragments/studentAssociationAvatar';
import type {
    GetStudentAssociationGroups,
    GetStudentAssociationProfile,
    GetStudentAssociationServices,
} from '../../queries/studentassociation';
import { mapGroupAvatarWithDescription } from '../group';
import { mapLink } from '../link';
import { mapSchool } from '../school';
import { mapCardService } from '../service';

interface StudentAssociationAvatarFragmentType {
    [$tada.fragmentRefs]: {
        StudentAssociationAvatar: 'StudentAssociation';
    };
}

export function mapStudentAssociationAvatar(
    studentAssociation: StudentAssociationAvatarFragmentType,
): Avatar {
    const data = readFragment(StudentAssociationAvatar, studentAssociation);
    return {
        name: data.name,
        pictureURL: data.pictureURL,
        uid: data.uid,
    };
}

export function mapStudentAssociationProfile(
    studentAssociation: ResultOf<typeof GetStudentAssociationProfile>['studentAssociation'],
): StudentAssociationProfile {
    return {
        activeMembersCount: studentAssociation.activeMembersCount,
        description: studentAssociation.descriptionHtml,
        email: studentAssociation.email,
        links: studentAssociation.links.map((link) => mapLink(link)),
        membersCount: studentAssociation.membersCount,
        school: mapSchool(studentAssociation.school),
        studentAssociation: mapStudentAssociationAvatar(studentAssociation),
    };
}

export function mapStudentAssociationGroups(
    studentAssociation: ResultOf<typeof GetStudentAssociationGroups>['studentAssociation'],
): Page<GroupAvatar> {
    const pageInfo = readFragment(PageInfoFragment, studentAssociation.groups.pageInfo);
    return {
        items: studentAssociation.groups.edges.map((edge) =>
            mapGroupAvatarWithDescription(edge.node),
        ),
        pageInfo,
    };
}

export function mapStudentAssociationServices(
    studentAssociation: ResultOf<typeof GetStudentAssociationServices>['studentAssociation'],
): Page<CardService> {
    const pageInfo = readFragment(PageInfoFragment, studentAssociation.services.pageInfo);
    return {
        items: studentAssociation.services.edges.map((edge) => mapCardService(edge.node)),
        pageInfo,
    };
}
