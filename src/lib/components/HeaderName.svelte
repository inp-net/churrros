<script lang="ts">
    import { Avatar as AvatarAzucar, Flex, Stack, Skeleton, SkeletonText, Scroll } from 'azucar-ui';

    import type { Avatar as AvatarType, Link } from '#lib/api/types.ts';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import LinkPill from '#lib/components/LinkPill.svelte';

    interface Props {
        name?: string;
        year?: number;
        nickname?: string;
        pictureURL?: string;
        description?: string;
        badges?: (AvatarType | null)[];
        links?: Link[];
        loading?: boolean;
    }

    let {
        name = '',
        year = 0,
        nickname = '',
        pictureURL = '',
        description = '',
        badges = [],
        links = [],
        loading = false,
    }: Props = $props();
</script>

<Stack align="stretch">
    <Flex wrap="nowrap">
        {#if loading}
            <Skeleton width="var(--size-xxl)" height="var(--size-xxl)" borderRadius="50%" />
        {:else}
            <AvatarAzucar src={pictureURL} alt={name} size="xxl" class="profile-avatar" />
        {/if}
        <Stack gap="xs">
            {#if loading}
                <SkeletonText lines={2} width="20ch" />
            {:else}
                <Flex align="baseline" gap="sm">
                    <h3 class="profile-name">{name}</h3>
                    {#if nickname}
                        <p><i>{nickname}</i></p>
                    {/if}
                </Flex>
            {/if}
            <Flex align="center">
                {#each badges as avatar}
                    <!-- Badge ne prend pas en compte d'URL -->
                    {#if avatar}
                        <Avatar {avatar} />
                    {/if}
                {/each}
            </Flex>
        </Stack>
    </Flex>
    <p class="profile-description">bla bla bla</p>
    <Scroll gap="xs">
        {#each links as link}
            <LinkPill {link} />
        {/each}
    </Scroll>
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
