import type { GroupRepository } from '$lib/api/repositories';
import { request } from '$lib/api/graphql/client';
import { GetBoardGroupMembers, GetGroupInfos, GetGroupMembers, GetGroupProfile, GetGroupSeeAlso } from '../../queries/group';
import { mapGroupBoardMembers, mapGroupInfos, mapGroupMembers, mapGroupProfile, mapGroupSeeAlso } from '../../mappers/group';

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
    async getGroupMembers(uid, args) {
        try {
            if (!uid) {
                throw new Error('UID is required to fetch group members');
            }
            const response = await request(GetGroupMembers, { uid, args });
            return mapGroupMembers(response.group.members);
        } catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error fetching group members:', error);
            throw error;
        }
    }
};