<script lang="ts">
    import { page } from '$app/state';
    import { groupRepository } from '$lib/api';
    import GroupBoardMembers from '$lib/components/tabs/GroupBoardMembers.svelte';
    import GroupInfo from '$lib/components/tabs/GroupInfo.svelte';
    import GroupProfile from '$lib/components/tabs/GroupProfile.svelte';
    import GroupSeeAlso from '$lib/components/tabs/GroupSeeAlso.svelte';
    import { m } from '$lib/paraglide/messages';
    import { createQuery } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';

    type Tab = 'info' | 'members' | 'see-also';

    const tab = $derived<Tab>((page.url.searchParams.get('tab') as Tab) || 'info');

    const queryProfile = createQuery(() => ({
        queryKey: ['group', page.params.id],
        queryFn: () => groupRepository.getGroupProfile(page.params.id)
    }));

    const queryInfo = createQuery(() => ({
        queryKey: ['group', page.params.id, 'info'],
        queryFn: () => groupRepository.getGroupInfos(page.params.id),
        enabled: tab === 'info'
    }));

    const queryBoardMembers = createQuery(() => ({
        queryKey: ['group', page.params.id, 'members'],
        queryFn: () => groupRepository.getGroupBoardMembers(page.params.id),
        enabled: tab === 'members'
    }));

    const querySeeAlso = createQuery(() => ({
        queryKey: ['group', page.params.id, 'see-also'],
        queryFn: () => groupRepository.getGroupSeeAlso(page.params.id),
        enabled: tab === 'see-also'
    }));
</script>

<Stack>
    <div>
        {#if queryProfile.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryProfile.isError}
            <p>ERROR</p>
        {:else if queryProfile.data}
            <GroupProfile groupProfile={queryProfile.data} />
        {/if}
        <div>
            <a href="?tab=info" class:active={tab === 'info'}>{m['info']()}</a>
            <a href="?tab=members" class:active={tab === 'members'}>{m['members']()}</a>
            <a href="?tab=see-also" class:active={tab === 'see-also'}>{m['seealso']()}</a>
        </div>
    </div>

    {#if tab === 'info'}
        {#if queryInfo.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryInfo.isError}
            <p>ERROR</p>
        {:else if queryInfo.data}
            <GroupInfo groupInfo={queryInfo.data} />
        {/if}
    {:else if tab === 'members'}
        {#if queryBoardMembers.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryBoardMembers.isError}
            <p>ERROR</p>
        {:else if queryBoardMembers.data}
            <GroupBoardMembers groupBoardMembers={queryBoardMembers.data} />
            <a href="/g/{page.params.id}/members">
                {m['group.see-all']({ count: queryBoardMembers.data.membersCount })}
            </a>
        {/if}
    {:else if tab === 'see-also'}
        {#if querySeeAlso.isLoading}
            <p>{m['loading']()}</p>
        {:else if querySeeAlso.isError}
            <p>ERROR</p>
        {:else if querySeeAlso.data}
            <GroupSeeAlso groupSeeAlso={querySeeAlso.data} />
        {/if}
    {/if}
</Stack>
