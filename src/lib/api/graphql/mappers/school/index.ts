import { type $tada, type ResultOf, readFragment } from 'gql.tada';

import type {
    Avatar,
    CardService,
    MajorInfos,
    SchoolInfos,
    SchoolProfile,
} from '#lib/api/index.ts';

import { SchoolAvatarFragment } from '../../queries/fragments/schoolAvatar';
import type {
    GetSchoolInfos,
    GetSchoolMajors,
    GetSchoolProfile,
    GetSchoolServices,
} from '../../queries/school';
import { mapMajorInfos } from '../major';
import { mapCardService } from '../service';
import { mapStudentAssociationAvatar } from '../studentassociation';

interface SchoolFragmentType {
    [$tada.fragmentRefs]: {
        SchoolAvatar: 'School';
    };
}

export function mapSchool(school: SchoolFragmentType): Avatar {
    const data = readFragment(SchoolAvatarFragment, school);
    return {
        name: data.name,
        pictureURL: data.pictureURL,
        uid: data.uid,
    };
}

export function mapSchoolProfile(
    school: ResultOf<typeof GetSchoolProfile>['school'],
): SchoolProfile {
    return {
        activeStudentsCount: school.activeStudentsCount,
        description: school.description,
        school: mapSchool(school),
        studentsCount: school.studentsCount,
    };
}

export function mapSchoolInfos(school: ResultOf<typeof GetSchoolInfos>['school']): SchoolInfos {
    return {
        address: school.address,
        studentAssociations: school.studentAssociations.map(mapStudentAssociationAvatar),
    };
}

export function mapSchoolMajors(school: ResultOf<typeof GetSchoolMajors>['school']): MajorInfos[] {
    return school.majors.map(mapMajorInfos);
}

export function mapSchoolServices(
    school: ResultOf<typeof GetSchoolServices>['school'],
): CardService[] {
    return school.services.map(mapCardService);
}
