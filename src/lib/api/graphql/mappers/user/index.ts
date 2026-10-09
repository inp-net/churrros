import type {
    Avatar,
    GroupMember,
    User,
    UserFamily,
    UserGroups,
    UserInfos,
    UserProfile
} from '#lib/api/index.ts';
import { readFragment, type ResultOf } from '#lib/api/graphql/graphql.ts';
import type {
    GetUserByUid,
    GetUserFamily,
    GetUserGroups,
    GetUserInfos,
    GetBirthdays,
    GetGroupedBirthdays,
    GetUserProfile
} from '#lib/api/graphql/queries/user/index.ts';
import { UserFragment } from '#lib/api/graphql/queries/fragments/user.ts';
import type { $tada } from 'gql.tada';
import { UserAvatarFragment } from '../../queries/fragments/userAvatar.ts';
import { mapStudentAssociationAvatar } from '../studentassociation/index.ts';
import { mapGroupMemberGroup } from '../group/index.ts';
import { mapLink } from '../link/index.ts';
import { GroupMemberWithUserFragment } from '../../queries/fragments/groupMemberWithUser.ts';
import { mapMajor } from '../major/index.ts';
import { mapSchool } from '../school/index.ts';

export function mapUser(user: ResultOf<typeof GetUserByUid>['user']): User {
    const userData = readFragment(UserFragment, user);
    return {
        uid: userData.uid,
        email: userData.email!,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname,
        pictureURL: userData.pictureURL,
        phone: userData.phone,
        admin: userData.admin
    };
}

type UserAvatarFragmentType = {
    [$tada.fragmentRefs]: {
        UserAvatar: 'User';
    };
};
export function mapUserAvatar(user: UserAvatarFragmentType): Avatar {
    const data = readFragment(UserAvatarFragment, user);
    return {
        uid: data.uid,
        name: data.fullName,
        pictureURL: data.pictureURL
    };
}

export function mapUserProfile(user: ResultOf<typeof GetUserProfile>['user']): UserProfile {
    return {
        ...mapUserAvatar(user),
        fullName: user.fullName,
        pronouns: user.pronouns,
        nickname: user.nickname,
        description: user.descriptionHtml,
        yearTier: user.yearTier,
        major: user.major ? mapMajor(user.major) : null,
        school: user.major ? user.major.schools.map(mapSchool) : [],
        links: user.links.map(mapLink),
        bot: user.bot,
        admin: user.admin || user.studentAssociationAdmin
    };
}

export function mapUserInfos(user: ResultOf<typeof GetUserInfos>['user']): UserInfos {
    return {
        address: user.address,
        nickname: user.nickname,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email!,
        otherEmails: user.otherEmails ? user.otherEmails : [],
        contributesTo: user.contributesTo
            ? user.contributesTo.map((avatar) => mapStudentAssociationAvatar(avatar))
            : null
    };
}

export function mapUserGroups(user: ResultOf<typeof GetUserGroups>['user']): UserGroups {
    return {
        groups: user.groups.map((group) => mapGroupMemberGroup(group))
    };
}

export function mapUserFamily(user: ResultOf<typeof GetUserFamily>['user']): UserFamily {
    return {
        uid: user.uid,
        nesting: user.familyTree.nesting,
        users: user.familyTree.users.map((user) => mapUserAvatar(user))
    };
}
export function mapBirthdays(birthdays: ResultOf<typeof GetBirthdays>['birthdays']): Avatar[] {
    return birthdays.map(mapUserAvatar);
}

export function mapGroupedBirthdays(
    groupedBirthdays: ResultOf<typeof GetGroupedBirthdays>['birthdays']
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
        Object.entries(result).sort(([a], [b]) => a.localeCompare(b)) //To sort the dates
    );
}

type GroupMemberWithUserFragmentType = {
    [$tada.fragmentRefs]: {
        GroupMemberUser: 'GroupMember';
    };
};

export function mapGroupMemberWithUser(groupMember: GroupMemberWithUserFragmentType): GroupMember {
    const data = readFragment(GroupMemberWithUserFragment, groupMember);
    return {
        title: data.title,
        treasurer: data.treasurer,
        secretary: data.secretary,
        vicePresident: data.vicePresident,
        president: data.president,
        avatar: mapUserAvatar(data.user)
    };
}
