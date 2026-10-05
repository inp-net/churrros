<script lang="ts">
    import { page } from '$app/state';
    import { studentAssociationRepository } from '$lib/api';
    import StudentAssociationGroups from '$lib/components/tabs/StudentAssociationGroups.svelte';
    import StudentAssociationProfile from '$lib/components/tabs/StudentAssociationProfile.svelte';
    import StudentAssociationServices from '$lib/components/tabs/StudentAssociationServices.svelte';

    import { m } from '$lib/paraglide/messages';
    import { createQuery } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';

    type Tab = 'boards' | 'clubs' | 'services';

    const tab = $derived<Tab>((page.url.searchParams.get('tab') as Tab) || 'boards');

    const queryProfile = createQuery(() => ({
        queryKey: ['studentAssociation', page.params.id],
        queryFn: () => studentAssociationRepository.getStudentAssociationProfile(page.params.id)
    }));

    const queryBoards = createQuery(() => ({
        queryKey: ['studentAssociation', page.params.id, 'boards'],
        queryFn: () =>
            studentAssociationRepository.getStudentAssociationGroups(
                page.params.id,
                ['StudentAssociationSection'],
                { first: 10, after: null }
            ),
        enabled: tab === 'boards'
    }));

    const queryClubs = createQuery(() => ({
        queryKey: ['studentAssociation', page.params.id, 'clubs'],
        queryFn: () =>
            studentAssociationRepository.getStudentAssociationGroups(
                page.params.id,
                ['Association', 'Club'],
                {
                    first: 10,
                    after: null
                }
            ),
        enabled: tab === 'clubs'
    }));

    const queryServices = createQuery(() => ({
        queryKey: ['studentAssociation', page.params.id, 'services'],
        queryFn: () =>
            studentAssociationRepository.getStudentAssociationServices(page.params.id, {
                first: 10,
                after: null
            }),
        enabled: tab === 'services'
    }));
</script>

<Stack>
    <div>
        {#if queryProfile.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryProfile.isError}
            <p>ERROR</p>
        {:else if queryProfile.data}
            <StudentAssociationProfile studentAssociationProfile={queryProfile.data} />
        {/if}
        <div>
            <a href="?tab=boards" class:active={tab === 'boards'}>{m['boards']()}</a>
            <a href="?tab=clubs" class:active={tab === 'clubs'}>{m['clubs']()}</a>
            <a href="?tab=services" class:active={tab === 'services'}>{m['services']()}</a>
        </div>
    </div>

    {#if tab === 'boards'}
        {#if queryBoards.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryBoards.isError}
            <p>ERROR</p>
        {:else if queryBoards.data}
            <StudentAssociationGroups
                groups={queryBoards.data}
                seeAll={{ url: `/a/${page.params.id}/boards`, text: m['board.see-all']() }}
            />
        {/if}
    {:else if tab === 'clubs'}
        {#if queryClubs.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryClubs.isError}
            <p>ERROR</p>
        {:else if queryClubs.data}
            <StudentAssociationGroups
                groups={queryClubs.data}
                seeAll={{ url: `/a/${page.params.id}/clubs`, text: m['clubs.see-all']() }}
            />
        {/if}
    {:else if tab === 'services'}
        {#if queryServices.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryServices.isError}
            <p>ERROR</p>
        {:else if queryServices.data}
            <StudentAssociationServices
                services={queryServices.data}
                seeAll={{ url: `/a/${page.params.id}/services`, text: m['services.see-all']() }}
            />
        {/if}
    {/if}
</Stack>
