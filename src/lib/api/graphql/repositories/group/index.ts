import type { GroupRepository } from '#lib/api/repositories.ts';
import { request } from '#lib/api/graphql/client.ts';
import {
    CreateGroup,
    EditGroupJoinPolicy,
    EditGroupParent,
    EditGroupProfile,
    EditGroupStudentAssociation,
    EditGroupType,
    GetBoardGroupMembers,
    GetGroupInfoForEdition,
    GetGroupInfos,
    GetGroupMembers,
    GetGroupPermissions,
    GetGroupProfile,
    GetGroupSeeAlso
} from '#lib/api/graphql/queries/group/index.ts';
import {
    assertMutationSuccess,
    mapCreateGroup,
    mapGroupBoardMembers,
    mapGroupEditInfo,
    mapGroupInfos,
    mapGroupMembers,
    mapGroupProfile,
    mapGroupSeeAlso
} from '#lib/api/graphql/mappers/group/index.ts';

export const groupRepository: GroupRepository = {
    async getGroupProfile(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group profile');
            }
            const response = await request(GetGroupProfile, { uid });
            return mapGroupProfile(response.group);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group profile:', error);
            throw error;
        }
    },
    async getGroupInfos(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group infos');
            }
            const response = await request(GetGroupInfos, { uid });
            return mapGroupInfos(response.group);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group infos:', error);
            throw error;
        }
    },
    async getGroupBoardMembers(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group board members');
            }
            const response = await request(GetBoardGroupMembers, { uid });
            return mapGroupBoardMembers(response.group);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group board members:', error);
            throw error;
        }
    },
    async getGroupSeeAlso(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group see also');
            }
            const response = await request(GetGroupSeeAlso, { uid });
            return mapGroupSeeAlso(response.group);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group see also:', error);
            throw error;
        }
    },
    async getGroupMembers(args, uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group members');
            }
            const response = await request(GetGroupMembers, {
                uid,
                first: args.first,
                after: args.after
            });
            return mapGroupMembers(response.group.members);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group members:', error);
            throw error;
        }
    },
    async createGroup(studentAssociationId, uid, name, type) {
        try {
            const response = await request(CreateGroup, {
                studentAssociation: studentAssociationId,
                uid,
                name,
                type
            });
            return mapCreateGroup(response.createGroup);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error creating group:', error);
            throw error;
        }
    },
    async getGroupPermissions(uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group permissions');
            }
            const response = await request(GetGroupPermissions, { uid });
            return response.group;
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group permissions:', error);
            throw error;
        }
    },
    async getGroupEditInfo(permissions, uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group edit info');
            }
            const response = await request(GetGroupInfoForEdition, {
                uid,
                withDetails: permissions.canEditDetails,
                withJoinPolicy: permissions.canEditJoinPolicy,
                withParent: permissions.canEditParent,
                withStudentAssociation: permissions.canEditStudentAssociation,
                withType: permissions.canEditType,
                withUnlisted: permissions.canEditUnlisted,
                withLydiaAccounts: permissions.canEditLydiaAccounts
            });
            return mapGroupEditInfo(response.group);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group edit info:', error);
            throw error;
        }
    },
    async updateGroup(data, uid) {
        try {
            if (!uid) {
                throw new Error('UID is required to update a group');
            }
            const {
                joinPolicy,
                parentUid,
                studentAssociationId,
                groupType,
                unlisted,
                ...profileFields
            } = data;

            // Allows us to only send the fields that are defined (null is a valid value)
            const profile = Object.fromEntries(
                Object.entries(profileFields).filter(([, value]) => value !== undefined)
            ) as typeof profileFields;

            const tasks: Promise<void>[] = [];

            if (Object.keys(profile).length > 0) {
                tasks.push(
                    request(EditGroupProfile, { uid, profile }).then((res) => {
                        assertMutationSuccess(res.updateGroupProfile);
                    })
                );
            }

            if (joinPolicy !== undefined) {
                tasks.push(
                    request(EditGroupJoinPolicy, { uid, joinPolicy }).then((res) => {
                        assertMutationSuccess(res.setGroupJoinPolicy);
                    })
                );
            }

            if (parentUid !== undefined) {
                tasks.push(
                    request(EditGroupParent, { uid, parentUid }).then((res) => {
                        assertMutationSuccess(res.setParentGroup);
                    })
                );
            }

            if (studentAssociationId !== undefined) {
                tasks.push(
                    request(EditGroupStudentAssociation, {
                        uid,
                        studentAssociation: studentAssociationId
                    }).then((res) => {
                        assertMutationSuccess(res.setGroupStudentAssociation);
                    })
                );
            }

            if (groupType !== undefined || unlisted !== undefined) {
                tasks.push(
                    request(EditGroupType, { uid, type: groupType, unlisted }).then((res) => {
                        assertMutationSuccess(res.setGroupType);
                    })
                );
            }

            await Promise.all(tasks);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error updating group:', error);
            throw error;
        }
    }
};
