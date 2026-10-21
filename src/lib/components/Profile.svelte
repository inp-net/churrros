<script lang="ts">
    import type { User, UserInfos } from '#lib/api/index.ts';
    import { Avatar, Flex, Stack, Tabs, Skeleton, SkeletonText } from 'azucar-ui';
    import UserInfo from '#lib/components/tabs/UserInfo.svelte';
    import ParagraphSeeMore from '#lib/components/ParagraphSeeMore.svelte';

    interface Props {
        profile?: User & UserInfos;
        loading?: boolean;
    }

    let { profile, loading = false }: Props = $props();

    const fullName = $derived(
        profile ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') : ''
    );
</script>

<Stack align="stretch">
    <!-- profile pictures, names and badged -->
    <Flex wrap={false}>
        {#if !loading}
            <Avatar src={profile?.pictureURL} alt={fullName} size="xxl" class="profile-avatar" />
        {:else}
            <Skeleton
                width="var(--size-xxl)"
                height="var(--size-xxl)"
                borderRadius="var(--corner-radius-full)"
            />
        {/if}
        <Stack gap="xs">
            {#if !loading && profile}
                <h3 class="profile-name">
                    {fullName}
                    <p><i>{profile.nickname}</i></p>
                </h3>
                <Flex align="center">
                    <p>67A SN</p>
                    <Flex gap="xs" align="center">
                        <Avatar alt="ENSEEIHT" size="md" />
                        <p>ENSEEIHT</p>
                    </Flex>
                </Flex>
            {:else}
                <Stack padding="xs">
                    <SkeletonText lines={1} width="20rem" />
                    <SkeletonText lines={2} width="10rem" />
                </Stack>
            {/if}
        </Stack>
    </Flex>

    <!-- description -->
    {#if !loading}
        <ParagraphSeeMore>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada vel eros at
            accumsan. Integer tempor purus leo, ac pellentesque ex sollicitudin sit amet. Aliquam
            ullamcorper tristique magna sed varius. Phasellus pharetra faucibus tellus, iaculis
            mattis lorem lacinia at. Nunc suscipit turpis eu libero pretium laoreet. In molestie,
            diam quis molestie elementum, leo ante egestas orci, ac feugiat nisl purus id velit.
            Nunc velit urna, commodo sed velit sit amet, pulvinar molestie lectus. In eu interdum
            augue. Donec a felis et ante tempor ornare eu eget sem. Morbi commodo mattis viverra.
            Aliquam sollicitudin suscipit mauris euismod sagittis. In pharetra urna vel velit
            pulvinar venenatis. Etiam ac est eu neque tincidunt egestas. Sed eu diam pellentesque
            dui aliquet placerat. Phasellus et fringilla sapien. Ut sit amet elit ex.
        </ParagraphSeeMore>
        <!-- <ParagraphSeeMore> -->
        <!--     Lorem ipsum dolor sit amet. -->
        <!-- </ParagraphSeeMore> -->
    {/if}

    <!-- tabs -->
    <Tabs tabs={['Info', 'Groups', 'Family']}>
        {#snippet content(tab)}
            {#if tab === 'Info' && profile && !loading}
                <UserInfo userInfo={profile} />
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
