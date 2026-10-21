<script lang="ts">
    import type { UserInfos } from '#lib/api/index.ts';
    import { Flex, Stack, Frame } from 'azucar-ui';
    import { type LucideIcon, Phone, Mail, MapPin, Cake } from '@lucide/svelte';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';

    interface Props {
        userInfo: UserInfos;
    }
    let { userInfo }: Props = $props();

    interface IconMap {
        data: string | null;
        icon: LucideIcon;
    }

    const showcaseInfos: IconMap[] = $derived(
        userInfo
            ? [
                  { data: formatISODateToLocale(userInfo.birthday ?? ''), icon: Cake },
                  { data: userInfo.email?.toLowerCase(), icon: Mail },
                  { data: userInfo.phone, icon: Phone },
                  { data: userInfo.address, icon: MapPin }
              ]
            : []
    );
</script>

<Stack gap="sm">
    {#each showcaseInfos as info}
        {#if info.data}
            <button type="button" onclick={() => navigator.clipboard.writeText(info.data ?? '')}>
                <Frame interactive>
                    <Flex wrap={false} gap="md" align="center">
                        <info.icon size="1rem" />
                        <p>{info.data}</p>
                    </Flex>
                </Frame>
            </button>
        {/if}
    {/each}
</Stack>
