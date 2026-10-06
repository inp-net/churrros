import { $tada, readFragment, type ResultOf } from "gql.tada";
import { SchoolAvatarFragment } from "../../queries/fragments/schoolAvatar";
import type { Avatar, MajorInfos, SchoolInfos, SchoolProfile, CardService } from "$lib/api/types";
import type { GetSchoolInfos, GetSchoolMajors, GetSchoolProfile, GetSchoolServices } from "../../queries/school";
import { mapStudentAssociationAvatar } from "../studentassociation";
import { mapMajorInfos } from "../major";
import { mapCardService } from "../service";


type SchoolFragmentType = {
    [$tada.fragmentRefs]: {
        SchoolAvatar: 'School';
    };
};

export function mapSchool(school: SchoolFragmentType): Avatar {
    const data = readFragment(SchoolAvatarFragment, school);
    return {
        uid: data.uid,
        name: data.name,
        pictureURL: data.pictureURL
    };
}

export function mapSchoolProfile(school: ResultOf<typeof GetSchoolProfile>['school']): SchoolProfile {
    return {
        school: mapSchool(school),
        activeStudentsCount: school.activeStudentsCount,
        studentsCount: school.studentsCount,
        description: school.description
    }
}

export function mapSchoolInfos(school: ResultOf<typeof GetSchoolInfos>['school']): SchoolInfos {
    return {
        address: school.address,
        studentAssociations: school.studentAssociations.map(mapStudentAssociationAvatar)
    }
}

export function mapSchoolMajors(school: ResultOf<typeof GetSchoolMajors>['school']): MajorInfos[] {
    return school.majors.map(mapMajorInfos);
}

export function mapSchoolServices(school: ResultOf<typeof GetSchoolServices>['school']): CardService[] {
    return school.services.map(mapCardService);
}