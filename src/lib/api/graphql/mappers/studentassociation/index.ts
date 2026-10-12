import { readFragment, type $tada, type ResultOf } from 'gql.tada';
import { StudentAssociationAvatar } from '../../queries/fragments/studentAssociationAvatar';
import type {
    Avatar,
    CardService,
    GroupAvatar,
    Page,
    StudentAssociationProfile
} from '#lib/api/types.d.ts';
import type {
    GetStudentAssociationGroups,
    GetStudentAssociationProfile,
    GetStudentAssociationServices
} from '../../queries/studentassociation';
import { mapSchool } from '../school';
import { mapLink } from '../link';
import { PageInfoFragment } from '../../queries/fragments/pagination';
import { mapGroupAvatarWithDescription } from '../group';
import { mapCardService } from '../service';

type StudentAssociationAvatarFragmentType = {
    [$tada.fragmentRefs]: {
        StudentAssociationAvatar: 'StudentAssociation';
    };
};

export function mapStudentAssociationAvatar(
    studentAssociation: StudentAssociationAvatarFragmentType
): Avatar {
    const data = readFragment(StudentAssociationAvatar, studentAssociation);
    return {
        uid: data.uid,
        name: data.name,
        pictureURL: data.pictureURL
    };
}

export function mapStudentAssociationProfile(
    studentAssociation: ResultOf<typeof GetStudentAssociationProfile>['studentAssociation']
): StudentAssociationProfile {
    return {
        studentAssociation: mapStudentAssociationAvatar(studentAssociation),
        email: studentAssociation.email,
        description: studentAssociation.descriptionHtml,
        activeMembersCount: studentAssociation.activeMembersCount,
        membersCount: studentAssociation.membersCount,
        links: studentAssociation.links.map((link) => mapLink(link)),
        school: mapSchool(studentAssociation.school)
    };
}

export function mapStudentAssociationGroups(
    studentAssociation: ResultOf<typeof GetStudentAssociationGroups>['studentAssociation']
): Page<GroupAvatar> {
    const pageInfo = readFragment(PageInfoFragment, studentAssociation.groups.pageInfo);
    return {
        items: studentAssociation.groups.edges.map((edge) =>
            mapGroupAvatarWithDescription(edge.node)
        ),
        pageInfo
    };
}

export function mapStudentAssociationServices(
    studentAssociation: ResultOf<typeof GetStudentAssociationServices>['studentAssociation']
): Page<CardService> {
    const pageInfo = readFragment(PageInfoFragment, studentAssociation.services.pageInfo);
    return {
        items: studentAssociation.services.edges.map((edge) => mapCardService(edge.node)),
        pageInfo
    };
}
