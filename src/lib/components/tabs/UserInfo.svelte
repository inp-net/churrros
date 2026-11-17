<script lang="ts">
    import type { UserInfos } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import { type LucideIcon, Phone, Mail, MapPin, Cake } from '@lucide/svelte';
    import { Stack } from 'azucar-ui';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import CopyFrame from '#lib/components/CopyFrame.svelte';

    interface Props {
        userInfo: UserInfos;
    }
    let { userInfo }: Props = $props();

    interface IconMap {
        data: string | null | undefined;
        icon: LucideIcon;
    }

    const showcaseInfos: IconMap[] = $derived(
        userInfo
            ? [
                  {
                      data: userInfo.birthday ? formatISODateToLocale(userInfo.birthday) : null,
                      icon: Cake
                  },
                  { data: userInfo.email?.toLowerCase(), icon: Mail },
                  ...(userInfo.otherEmails?.map((email) => ({
                      data: email.toLowerCase(),
                      icon: Mail
                  })) ?? []),
                  { data: userInfo.phone, icon: Phone },
                  { data: userInfo.address, icon: MapPin }
              ]
            : []
    );
</script>

<Stack gap="sm">
    {#each showcaseInfos as info}
        {#if info.data}
            <CopyFrame content={info.data} icon={info.icon} />
        {/if}
    {/each}

    {#if userInfo?.contributesTo?.length}
        <div>
            {#each userInfo.contributesTo as studentAssociation (studentAssociation.uid)}
                <Avatar avatar={studentAssociation} />
            {/each}
        </div>
    {/if}
</Stack>
