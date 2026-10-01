<script lang="ts">
    import { Avatar, Flex, Stack, Tabs } from 'azucar-ui';

    const { data } = $props();
</script>

{#if data.user}
    <Stack align="stretch">
        <Flex wrap={false}>
            <Avatar
                src={data.user.pictureURL}
                alt={[data.user.firstName, data.user.lastName].join(' ')}
                size="xxl"
                class="profile-avatar"
            />
            <Stack gap="xs">
                <h3 class="profile-name">
                    {[data.user.firstName, data.user.lastName].join(' ')}aaaaaaaa
                </h3>
                <Flex align="center">
                    <p>67A SN</p>
                    <Flex gap="xs" align="center">
                        <Avatar alt="ENSEEIHT" size="lg" />
                        <p>ENSEEIHT</p>
                    </Flex>
                </Flex>
            </Stack>
        </Flex>
        <p class="profile-description">bla bla bla</p>
        <Tabs tabs={['Info', 'Groups', 'Family']} />
    </Stack>
{/if}

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
