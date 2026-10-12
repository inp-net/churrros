<script lang="ts">
    import { page } from '$app/state';
    import { schoolRepository } from '#lib/api/index.ts';
    import SchoolInfo from '#lib/components/tabs/SchoolInfo.svelte';
    import SchoolMajors from '#lib/components/tabs/SchoolMajors.svelte';
    import SchoolProfile from '#lib/components/tabs/SchoolProfile.svelte';
    import SchoolServices from '#lib/components/tabs/SchoolServices.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createQuery } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';

    type Tab = 'info' | 'majors' | 'services';

    const tab = $derived<Tab>((page.url.searchParams.get('tab') as Tab) || 'info');

    const queryProfile = createQuery(() => ({
        queryKey: ['school', page.params.id],
        queryFn: () => schoolRepository.getSchoolProfile(page.params.id)
    }));

    const queryInfo = createQuery(() => ({
        queryKey: ['school', page.params.id, 'info'],
        queryFn: () => schoolRepository.getSchoolInfos(page.params.id),
        enabled: tab === 'info'
    }));

    const queryMajors = createQuery(() => ({
        queryKey: ['user', page.params.id, 'majors'],
        queryFn: () => schoolRepository.getSchoolMajors(page.params.id),
        enabled: tab === 'majors'
    }));

    const queryServices = createQuery(() => ({
        queryKey: ['user', page.params.id, 'services'],
        queryFn: () => schoolRepository.getSchoolServices(page.params.id),
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
            <SchoolProfile profile={queryProfile.data} />
        {/if}
        <div>
            <a href="?tab=info" class:active={tab === 'info'}>{m['info']()}</a>
            <a href="?tab=majors" class:active={tab === 'majors'}>{m['majors']()}</a>
            <a href="?tab=services" class:active={tab === 'services'}>{m['services']()}</a>
        </div>
    </div>

    {#if tab === 'info'}
        {#if queryInfo.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryInfo.isError}
            <p>ERROR</p>
        {:else if queryInfo.data}
            <SchoolInfo schoolInfo={queryInfo.data} />
        {/if}
    {:else if tab === 'majors'}
        {#if queryMajors.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryMajors.isError}
            <p>ERROR</p>
        {:else if queryMajors.data}
            <SchoolMajors schoolMajors={queryMajors.data} />
        {/if}
    {:else if tab === 'services'}
        {#if queryServices.isLoading}
            <p>{m['loading']()}</p>
        {:else if queryServices.isError}
            <p>ERROR</p>
        {:else if queryServices.data}
            <SchoolServices services={queryServices.data} />
        {/if}
    {/if}
</Stack>
