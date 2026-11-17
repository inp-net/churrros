<script lang="ts">
    import { Avatar, Badge, Flex, Stack, Tabs, Skeleton, SkeletonText } from 'azucar-ui';
    import type { Link } from '#lib/api/types.ts';

    interface Props {
        name?: string;
        nickname?: string;
        pictureURL?: string;
        description?: string;
        badges: Link[];
        loading: boolean;
    }

    let {
        name = '',
        nickname = '',
        pictureURL = '',
        description = '',
        badges = [],
        loading = false
    }: Props = $props();
</script>

<Stack align="stretch">
    <Flex wrap={false}>
        {#if loading}
            <Skeleton width="var(--size-xxl)" height="var(--size-xxl)" borderRadius="50%" />
        {:else}
            <Avatar src={pictureURL} alt={name} size="xxl" class="profile-avatar" />
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
                {#each badges as badge}
                    <!-- Badge ne prend pas en compte d'URL -->
                    <Badge variant="outline">{badge.text}</Badge>
                {/each}
            </Flex>
        </Stack>
    </Flex>
    <p class="profile-description">bla bla bla</p>
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
