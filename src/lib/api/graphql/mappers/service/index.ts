import { type $tada, type ResultOf, readFragment } from 'gql.tada';

import type { CardService } from '#lib/api/types.ts';

import { CardServiceFragment } from '../../queries/fragments/cardService';
import type { GetServices } from '../../queries/service';

interface CardServiceFragmentType {
    [$tada.fragmentRefs]: {
        CardService: 'Service';
    };
}

export function mapCardService(cardService: CardServiceFragmentType): CardService {
    const data = readFragment(CardServiceFragment, cardService);
    return {
        description: data.description,
        id: data.localID,
        logo: data.logo,
        name: data.name,
        pinned: data.pinned,
        url: data.url,
    };
}

export function mapServices(services: ResultOf<typeof GetServices>['services']): CardService[] {
    return services.map((service) => mapCardService(service));
}
