<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '#lib/api/index.ts';
    import UserFamily from '#lib/components/tabs/UserFamily.svelte';
    import UserGroups from '#lib/components/tabs/UserGroups.svelte';
    import UserInfo from '#lib/components/tabs/UserInfo.svelte';
    import UserProfile from '#lib/components/tabs/UserProfile.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createQuery } from '@tanstack/svelte-query';
    import { Stack, Tabs } from 'azucar-ui';

    const TABS = ['info', 'groups', 'family'] as const;
    type Tab = (typeof TABS)[number];

    let selected = $state(0);
    const activeTab = $derived<Tab>(TABS[selected] ?? 'info');

    const queryProfile = createQuery(() => ({
        queryKey: ['user', page.params.id],
        queryFn: () => userRepository.getUserProfile(page.params.id)
    }));

    const queryInfo = createQuery(() => ({
        queryKey: ['user', page.params.id, 'info'],
        queryFn: () => userRepository.getUserInfos(page.params.id),
        enabled: activeTab === 'info'
    }));

    const queryGroups = createQuery(() => ({
        queryKey: ['user', page.params.id, 'groups'],
        queryFn: () => userRepository.getUserGroups(page.params.id),
        enabled: activeTab === 'groups'
    }));

    const queryFamily = createQuery(() => ({
        queryKey: ['user', page.params.id, 'family'],
        queryFn: () => userRepository.getUserFamily(page.params.id),
        enabled: activeTab === 'family'
    }));
</script>

<Stack gap="xl">
    <div>
        {#if queryProfile.isPending}
            <p>{m['loading']()}</p>
        {:else if queryProfile.isError}
            <p>ERROR</p>
        {:else if queryProfile.data}
            <UserProfile userProfile={queryProfile.data} />
        {/if}
    </div>

    <Stack gap="md">
        <Tabs tabs={TABS.map((t) => m[t]())} bind:selected>
            {#snippet content()}
                {#if activeTab === 'info'}
                    {#if queryInfo.isPending}
                        <p>{m['loading']()}</p>
                    {:else if queryInfo.isError}
                        <p>ERROR</p>
                    {:else if queryInfo.data}
                        <UserInfo userInfo={queryInfo.data} />
                    {/if}
                {:else if activeTab === 'groups'}
                    {#if queryGroups.isPending}
                        <p>{m['loading']()}</p>
                    {:else if queryGroups.isError}
                        <p>ERROR</p>
                    {:else if queryGroups.data}
                        <UserGroups userGroups={queryGroups.data} />
                    {/if}
                {:else if activeTab === 'family'}
                    {#if queryFamily.isPending}
                        <p>{m['loading']()}</p>
                    {:else if queryFamily.isError}
                        <p>ERROR</p>
                    {:else if queryFamily.data}
                        <UserFamily userFamily={queryFamily.data} />
                    {/if}
                {/if}
            {/snippet}
        </Tabs>
    </Stack>
</Stack>
