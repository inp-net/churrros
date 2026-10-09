<script lang="ts">
    import type { UserInfos } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        userInfo: UserInfos;
    }
    let { userInfo }: Props = $props();
</script>

<div>
    {#if userInfo?.birthday}
        {formatISODateToLocale(userInfo.birthday)}
    {/if}
    {userInfo?.email}
    {#each userInfo?.otherEmails as email (email)}
        {email}
    {/each}
    {userInfo?.phone}
    {userInfo?.address}
    {#if userInfo?.contributesTo}
        {#each userInfo.contributesTo as studentAssociation (studentAssociation.uid)}
            <Avatar avatar={studentAssociation} />
        {/each}
    {/if}
</div>
