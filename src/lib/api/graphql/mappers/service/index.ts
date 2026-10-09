import { readFragment, type $tada, type ResultOf } from 'gql.tada';
import { CardServiceFragment } from '../../queries/fragments/cardService';
import type { CardService } from '#lib/api/types.d.ts';

type CardServiceFragmentType = {
    [$tada.fragmentRefs]: {
        CardService: 'Service';
    };
};

export function mapCardService(cardService: CardServiceFragmentType): CardService {
    const data = readFragment(CardServiceFragment, cardService);
    return {
        name: data.name,
        url: data.url,
        description: data.description,
        id: data.localID,
        logo: data.logo,
        pinned: data.pinned
    };
}
