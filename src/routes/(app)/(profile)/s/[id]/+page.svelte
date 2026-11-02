<script lang="ts">
    import { page } from '$app/state';
    import { createQuery } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';

    import { schoolRepository } from '#lib/api/index.ts';
    import SchoolInfo from '#lib/components/tabs/SchoolInfo.svelte';
    import SchoolMajors from '#lib/components/tabs/SchoolMajors.svelte';
    import SchoolProfile from '#lib/components/tabs/SchoolProfile.svelte';
    import SchoolServices from '#lib/components/tabs/SchoolServices.svelte';
    import { m } from '#lib/paraglide/messages.js';

    type Tab = 'info' | 'majors' | 'services';

    const tab = $derived<Tab>((page.url.searchParams.get('tab') as Tab) || 'info'),
        queryProfile = createQuery(() => ({
            queryFn: () => schoolRepository.getSchoolProfile(page.params.id),
            queryKey: ['school', page.params.id],
        })),
        queryInfo = createQuery(() => ({
            enabled: tab === 'info',
            queryFn: () => schoolRepository.getSchoolInfos(page.params.id),
            queryKey: ['school', page.params.id, 'info'],
        })),
        queryMajors = createQuery(() => ({
            enabled: tab === 'majors',
            queryFn: () => schoolRepository.getSchoolMajors(page.params.id),
            queryKey: ['user', page.params.id, 'majors'],
        })),
        queryServices = createQuery(() => ({
            enabled: tab === 'services',
            queryFn: () => schoolRepository.getSchoolServices(page.params.id),
            queryKey: ['user', page.params.id, 'services'],
        }));
</script>

<Stack>
    <div>
        {#if queryProfile.isPending}
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
        {#if queryInfo.isPending}
            <p>{m['loading']()}</p>
        {:else if queryInfo.isError}
            <p>ERROR</p>
        {:else if queryInfo.data}
            <SchoolInfo schoolInfo={queryInfo.data} />
        {/if}
    {:else if tab === 'majors'}
        {#if queryMajors.isPending}
            <p>{m['loading']()}</p>
        {:else if queryMajors.isError}
            <p>ERROR</p>
        {:else if queryMajors.data}
            <SchoolMajors schoolMajors={queryMajors.data} />
        {/if}
    {:else if tab === 'services'}
        {#if queryServices.isPending}
            <p>{m['loading']()}</p>
        {:else if queryServices.isError}
            <p>ERROR</p>
        {:else if queryServices.data}
            <SchoolServices services={queryServices.data} />
        {/if}
    {/if}
</Stack>
