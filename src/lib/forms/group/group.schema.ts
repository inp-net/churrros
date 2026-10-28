import { type } from 'arktype';

import { GroupType } from '#lib/api/types.ts';

export const createGroupSchema = type({
    groupType: GroupType,
    name: type('string >= 2'),
    studentAssociationId: type('string > 0'),
    uid: type(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
});

export type CreateGroupInput = typeof createGroupSchema.infer;

const updateGroupBaseSchema = type({
    color: type('string | null'),
    email: type('string.email | null'),
    groupType: GroupType,
    joinPolicy: "'Open' | 'Closed'",
    longDescription: type('string'),
    name: type('string >= 2'),
    parentUid: 'string | null',
    relatedGroups: type('string[]'),
    room: type('string'),
    shortDescription: type('string'),
    studentAssociationId: type('string > 0'),
    unlisted: 'boolean',
});

export const updateGroupSchema = updateGroupBaseSchema.partial();

export type UpdateGroupPatch = typeof updateGroupSchema.infer;
