import { readFragment, type $tada, type ResultOf } from 'gql.tada';
import { CardServiceFragment } from '../../queries/fragments/cardService';
import type { CardService } from '#lib/api/types.ts';
import type { GetServices } from '../../queries/service';

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

export function mapServices(services: ResultOf<typeof GetServices>['services']): CardService[] {
    return services.map((service) => mapCardService(service));
}
