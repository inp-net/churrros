import { readFragment, type $tada } from 'gql.tada';
import { StudentAssociationAvatar } from '../../queries/fragments/studentAssociationAvatar';
import type { Avatar } from '$lib/api/types';

type StudentAssociationAvatarFragmentType = {
    [$tada.fragmentRefs]: {
        StudentAssociationAvatar: 'StudentAssociation';
    };
};

export function mapStudentAssociationAvatar(studentAssociation: StudentAssociationAvatarFragmentType): Avatar {
    const data = readFragment(StudentAssociationAvatar, studentAssociation);
    return {
        uid: data.uid,
        name: data.name,
        pictureURL: data.pictureURL
    };
}