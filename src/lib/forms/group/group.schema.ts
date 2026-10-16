import { type } from 'arktype';
import { GroupType } from '#lib/api/types.ts';

export const createGroupSchema = type({
    studentAssociationId: type('string > 0'),
    name: type('string >= 2'),
    uid: type(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
    groupType: GroupType
});

export type CreateGroupInput = typeof createGroupSchema.infer;
