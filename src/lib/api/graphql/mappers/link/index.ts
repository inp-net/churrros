import { type $tada, readFragment } from 'gql.tada';

import type { Link } from '#lib/api/index.ts';

import { LinkFragment } from '../../queries/fragments/link';

interface LinkFragment {
    [$tada.fragmentRefs]: {
        Link: 'Link';
    };
}

export function mapLink(link: LinkFragment): Link {
    const data = readFragment(LinkFragment, link);
    return {
        text: data.text,
        url: data.url,
    };
}
