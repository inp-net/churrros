import { type } from 'arktype';
import { GroupType } from '#lib/api/types.ts';

export const createGroupSchema = type({
    studentAssociationId: type('string > 0'),
    name: type('string >= 2'),
    uid: type(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
    groupType: GroupType
});

export type CreateGroupInput = typeof createGroupSchema.infer;

const updateGroupBaseSchema = type({
    name: type('string >= 2'),
    shortDescription: type('string'),
    longDescription: type('string'),
    email: type('string.email | null'),
    room: type('string'),
    color: type('string | null'),
    relatedGroups: type('string[]'),
    joinPolicy: "'Open' | 'Closed'",
    parentUid: 'string | null',
    studentAssociationId: type('string > 0'),
    groupType: GroupType,
    unlisted: 'boolean'
});

export const updateGroupSchema = updateGroupBaseSchema.partial();

export type UpdateGroupPatch = typeof updateGroupSchema.infer;
