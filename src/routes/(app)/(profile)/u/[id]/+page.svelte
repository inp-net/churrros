<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '#lib/api/index.ts';
    import UserFamily from '#lib/components/tabs/UserFamily.svelte';
    import UserGroups from '#lib/components/tabs/UserGroups.svelte';
    import UserInfo from '#lib/components/tabs/UserInfo.svelte';
    import UserProfile from '#lib/components/tabs/UserProfile.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createQuery } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';

    type Tab = 'info' | 'groups' | 'family';

    const tab = $derived<Tab>((page.url.searchParams.get('tab') as Tab) || 'info');

    const queryProfile = createQuery(() => ({
        queryKey: ['user', page.params.id],
        queryFn: () => userRepository.getUserProfile(page.params.id)
    }));

    const queryInfo = createQuery(() => ({
        queryKey: ['user', page.params.id, 'info'],
        queryFn: () => userRepository.getUserInfos(page.params.id),
        enabled: tab === 'info'
    }));

    const queryGroups = createQuery(() => ({
        queryKey: ['user', page.params.id, 'groups'],
        queryFn: () => userRepository.getUserGroups(page.params.id),
        enabled: tab === 'groups'
    }));

    const queryFamily = createQuery(() => ({
        queryKey: ['user', page.params.id, 'family'],
        queryFn: () => userRepository.getUserFamily(page.params.id),
        enabled: tab === 'family'
    }));
</script>

<Stack>
    <div>
        {#if queryProfile.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryProfile.isError}
            <p>ERROR</p>
        {:else if queryProfile.data}
            <UserProfile userProfile={queryProfile.data} />
        {/if}
        <div>
            <a href="?tab=info" class:active={tab === 'info'}>{m['info']()}</a>
            <a href="?tab=groups" class:active={tab === 'groups'}>{m['groups']()}</a>
            <a href="?tab=family" class:active={tab === 'family'}>{m['family']()}</a>
        </div>
    </div>

    {#if tab === 'info'}
        {#if queryInfo.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryInfo.isError}
            <p>ERROR</p>
        {:else if queryInfo.data}
            <UserInfo userInfo={queryInfo.data} />
        {/if}
    {:else if tab === 'groups'}
        {#if queryGroups.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryGroups.isError}
            <p>ERROR</p>
        {:else if queryGroups.data}
            <UserGroups userGroups={queryGroups.data} />
        {/if}
    {:else if tab === 'family'}
        {#if queryFamily.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryFamily.isError}
            <p>ERROR</p>
        {:else if queryFamily.data}
            <UserFamily userFamily={queryFamily.data} />
        {/if}
    {/if}
</Stack>
