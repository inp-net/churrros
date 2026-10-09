import { readFragment, type $tada } from 'gql.tada';
import { MajorAvatarFragment } from '../../queries/fragments/majorAvatar';
import type { Avatar, MajorInfos } from '#lib/api/types.d.ts';
import { MajorInfosFragment } from '../../queries/fragments/majorInfos';

type MajorFragmentType = {
    [$tada.fragmentRefs]: {
        MajorAvatar: 'Major';
    };
};

export function mapMajor(major: MajorFragmentType): Avatar {
    const data = readFragment(MajorAvatarFragment, major);
    return {
        uid: data.uid,
        name: data.name,
        pictureURL: data.pictureURL
    };
}

type MajorInfosFragmentType = {
    [$tada.fragmentRefs]: {
        MajorInfos: 'Major';
    };
};

export function mapMajorInfos(major: MajorInfosFragmentType): MajorInfos {
    const data = readFragment(MajorInfosFragment, major);
    return {
        avatar: mapMajor(data),
        fullName: data.fullName,
        discontinued: data.discontinued
    };
}
