import type { $tada } from 'gql.tada';

import { type ResultOf, readFragment } from '#lib/api/graphql/graphql.ts';
import { UserFragment } from '#lib/api/graphql/queries/fragments/user.ts';
import type {
    GetBirthdays,
    GetGroupedBirthdays,
    GetUserByUid,
    GetUserFamily,
    GetUserGroups,
    GetUserInfos,
    GetUserProfile,
} from '#lib/api/graphql/queries/user/index.ts';
import type {
    Avatar,
    GroupMember,
    User,
    UserFamily,
    UserGroups,
    UserInfos,
    UserProfile,
} from '#lib/api/index.ts';

import { GroupMemberWithUserFragment } from '../../queries/fragments/groupMemberWithUser.ts';
import { UserAvatarFragment } from '../../queries/fragments/userAvatar.ts';
import { mapGroupMemberGroup } from '../group/index.ts';
import { mapLink } from '../link/index.ts';
import { mapMajor } from '../major/index.ts';
import { mapSchool } from '../school/index.ts';
import { mapStudentAssociationAvatar } from '../studentassociation/index.ts';

export function mapUser(user: ResultOf<typeof GetUserByUid>['user']): User {
    const userData = readFragment(UserFragment, user);
    return {
        admin: userData.admin,
        email: userData.email!,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname,
        paymentPhone: userData.lydiaPhone,
        phone: userData.phone,
        pictureURL: userData.pictureURL,
        uid: userData.uid,
    };
}

interface UserAvatarFragmentType {
    [$tada.fragmentRefs]: {
        UserAvatar: 'User';
    };
}
export function mapUserAvatar(user: UserAvatarFragmentType): Avatar {
    const data = readFragment(UserAvatarFragment, user);
    return {
        name: data.fullName,
        pictureURL: data.pictureURL,
        uid: data.uid,
    };
}

export function mapUserProfile(user: ResultOf<typeof GetUserProfile>['user']): UserProfile {
    return {
        ...mapUserAvatar(user),
        admin: user.admin || user.studentAssociationAdmin,
        bot: user.bot,
        description: user.descriptionHtml,
        fullName: user.fullName,
        links: user.links.map(mapLink),
        major: user.major ? mapMajor(user.major) : null,
        nickname: user.nickname,
        pronouns: user.pronouns,
        school: user.major ? user.major.schools.map(mapSchool) : [],
        yearTier: user.yearTier,
    };
}

export function mapUserInfos(user: ResultOf<typeof GetUserInfos>['user']): UserInfos {
    return {
        address: user.address,
        birthday: user.birthday,
        contributesTo: user.contributesTo
            ? user.contributesTo.map((avatar) => mapStudentAssociationAvatar(avatar))
            : null,
        email: user.email!,
        nickname: user.nickname,
        otherEmails: user.otherEmails ? user.otherEmails : [],
        phone: user.phone,
    };
}

export function mapUserGroups(user: ResultOf<typeof GetUserGroups>['user']): UserGroups {
    return {
        groups: user.groups.map((group) => mapGroupMemberGroup(group)),
    };
}

export function mapUserFamily(user: ResultOf<typeof GetUserFamily>['user']): UserFamily {
    return {
        nesting: user.familyTree.nesting,
        uid: user.uid,
        users: user.familyTree.users.map((user) => mapUserAvatar(user)),
    };
}
export function mapBirthdays(birthdays: ResultOf<typeof GetBirthdays>['birthdays']): Avatar[] {
    return birthdays.map(mapUserAvatar);
}

export function mapGroupedBirthdays(
    groupedBirthdays: ResultOf<typeof GetGroupedBirthdays>['birthdays'],
): Record<string, Avatar[]> {
    const result: Record<string, Avatar[]> = {};
    for (const item of groupedBirthdays) {
        const date = item.birthday?.slice(5, 10); // Extract MM-DD from ISO
        if (date === undefined) {
            continue;
        }
        const avatar = mapUserAvatar(item);
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(avatar);
    }
    return Object.fromEntries(
        Object.entries(result).sort(([a], [b]) => a.localeCompare(b)), //To sort the dates
    );
}

interface GroupMemberWithUserFragmentType {
    [$tada.fragmentRefs]: {
        GroupMemberUser: 'GroupMember';
    };
}

export function mapGroupMemberWithUser(groupMember: GroupMemberWithUserFragmentType): GroupMember {
    const data = readFragment(GroupMemberWithUserFragment, groupMember);
    return {
        avatar: mapUserAvatar(data.user),
        president: data.president,
        secretary: data.secretary,
        title: data.title,
        treasurer: data.treasurer,
        vicePresident: data.vicePresident,
    };
}
