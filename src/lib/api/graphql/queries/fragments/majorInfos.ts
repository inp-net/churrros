import { graphql } from '#lib/api/graphql/graphql.ts';
import { MajorAvatarFragment } from './majorAvatar';

export const MajorInfosFragment = graphql(
    `
        fragment MajorInfos on Major {
            ...MajorAvatar
            fullName
            discontinued
        }
    `,
    [MajorAvatarFragment]
);
