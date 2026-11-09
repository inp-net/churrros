import { type $tada, type ResultOf, readFragment } from 'gql.tada';

import type { CardService } from '#lib/api/types.ts';
import type { ServiceInput } from '#lib/forms/service/service.schema.ts';

import { CardServiceFragment } from '../../queries/fragments/cardService';
import type { GetServiceInfo, GetServices } from '../../queries/service';

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
        canEdit: data.canEdit,
    };
}

export function mapServices(services: ResultOf<typeof GetServices>['services']): CardService[] {
    return services.map((service) => mapCardService(service));
}

export function mapServiceInfo(service: ResultOf<typeof GetServiceInfo>['service']): ServiceInput {
    return {
        name: service.name,
        description: service.description,
        url: service.url,
        importance: service.importance,
        hide: service.hidden,
        iconUrl: service.logo,
        schoolId: service.owner.__typename === 'School' ? service.owner.uid : null,
        groupId: service.owner.__typename === 'Group' ? service.owner.uid : null,
        studentAssociationId:
            service.owner.__typename === 'StudentAssociation' ? service.owner.uid : null,
    };
}
