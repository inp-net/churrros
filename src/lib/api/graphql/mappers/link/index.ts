import type { Link } from '$lib/api/types';
import { readFragment, type $tada } from 'gql.tada';
import { LinkFragment } from '../../queries/fragments/link';

type LinkFragment = {
    [$tada.fragmentRefs]: {
        Link: 'Link';
    };
};

export function mapLink(link: LinkFragment): Link {
    const data = readFragment(LinkFragment, link);
    return {
        url: data.url,
        text: data.text
    };
}
