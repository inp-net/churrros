import { type $tada, readFragment } from 'gql.tada';

import type { Avatar, MajorInfos } from '#lib/api/index.ts';

import { MajorAvatarFragment } from '../../queries/fragments/majorAvatar';
import { MajorInfosFragment } from '../../queries/fragments/majorInfos';

interface MajorFragmentType {
    [$tada.fragmentRefs]: {
        MajorAvatar: 'Major';
    };
}

export function mapMajor(major: MajorFragmentType): Avatar {
    const data = readFragment(MajorAvatarFragment, major);
    return {
        name: data.name,
        pictureURL: data.pictureURL,
        uid: data.uid,
    };
}

interface MajorInfosFragmentType {
    [$tada.fragmentRefs]: {
        MajorInfos: 'Major';
    };
}

export function mapMajorInfos(major: MajorInfosFragmentType): MajorInfos {
    const data = readFragment(MajorInfosFragment, major);
    return {
        avatar: mapMajor(data),
        discontinued: data.discontinued,
        fullName: data.fullName,
    };
}
