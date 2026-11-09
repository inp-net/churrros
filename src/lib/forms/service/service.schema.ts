import { type } from 'arktype';

export const serviceSchema = type({
    name: type('string > 0'),
    url: type('string.url > 0'),
    description: type('string'),
    importance: type('number >= 0'),
    hide: type('boolean'),
    iconUrl: type('string.url | null'), //null to delete the icon
    schoolId: type('string | null'), //null to delete the school
    groupId: type('string | null'), //null to delete the group
    studentAssociationId: type('string | null'), //null to delete the student association
});

export type ServiceInput = typeof serviceSchema.infer;
