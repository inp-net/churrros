<script lang="ts">
    import { getLocale } from '#lib/paraglide/runtime.js';
    import type { ProfileData } from '#lib/api/index.ts';
    import { Avatar, Flex, Stack, Tabs, Frame, Tooltip } from 'azucar-ui';
    import { type LucideIcon, Phone, Mail, MapPin, Cake } from '@lucide/svelte';

    interface Props {
        profile: ProfileData;
    }

    let { profile }: Props = $props();

    interface IconMap {
        data: string | null | undefined;
        icon: LucideIcon;
    }

    const showcaseInfos: IconMap[] = $derived([
        {
            data: profile.birthday
                ? new Date(profile.birthday).toLocaleDateString(getLocale())
                : null,
            icon: Cake
        },
        { data: profile.email?.toLowerCase(), icon: Mail },
        { data: profile.phone, icon: Phone },
        { data: profile.address, icon: MapPin }
    ]);

    const fullName = $derived([profile.firstName, profile.lastName].filter(Boolean).join(' '));
</script>

<!-- prints user infos details in the tab -->
{#snippet showInfo()}
    <Stack gap="sm">
        {#each showcaseInfos as info}
            {#if info.data}
                <button
                    type="button"
                    onclick={() => navigator.clipboard.writeText(info.data ?? '')}
                >
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
{/snippet}

<Stack align="stretch">
    <Flex wrap={false}>
        <Avatar src={profile.pictureURL} alt={fullName} size="xxl" class="profile-avatar" />
        <Stack gap="xs">
            <h3 class="profile-name">
                {fullName}
            </h3>
            <Flex align="center">
                <p>67A SN</p>
                <Flex gap="xs" align="center">
                    <Avatar alt="ENSEEIHT" size="md" />
                    <p>ENSEEIHT</p>
                </Flex>
            </Flex>
        </Stack>
    </Flex>
    <p class="profile-description">bla bla bla</p>
    <Tabs tabs={['Info', 'Groups', 'Family']}>
        {#snippet content(tab)}
            {#if tab === 'Info'}
                {@render showInfo()}
            {:else if tab === 'Groups'}
                <p>Bonjour</p>
            {:else if tab === 'Family'}
                <p>Hello</p>
            {/if}
        {/snippet}
    </Tabs>
</Stack>

<style>
    :global(.profile-avatar) {
        flex-shrink: 0;
    }

    .profile-name {
        line-break: auto;
    }

    .profile-description {
        color: var(--color-fg-low);
    }
</style>
