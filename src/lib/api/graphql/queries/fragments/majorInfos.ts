import { graphql } from '$lib/api/graphql/graphql';
import { MajorAvatarFragment } from './majorAvatar';

/**
 * GraphQL fragment that retrieves all information about a major
 */
export const MajorInfosFragment = graphql(`
    fragment MajorInfos on Major {
        ...MajorAvatar
        fullName
        discontinued
    }
`, [MajorAvatarFragment]);
