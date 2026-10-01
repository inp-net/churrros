<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '$lib/api';
    import Avatar from '$lib/components/avatar/Avatar.svelte';
    import { m } from '$lib/paraglide/messages';
    import { formatISODateToLocale } from '$lib/utils/dates';
    import { createQuery } from '@tanstack/svelte-query';

    const query = createQuery(() => ({
        queryKey: ['user', page.params.id, 'info'],
        queryFn: () => userRepository.getUserInfos(page.params.id)
    }));
</script>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <!--If the user is not found-->
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#if query.data?.birthday}
        {formatISODateToLocale(query.data.birthday)}
    {/if}
    {query.data?.email}
    {#each query.data?.otherEmails as email (email)}
        {email}
    {/each}
    {query.data?.phone}
    {query.data?.address}
    {#if query.data?.contributesTo}
        {#each query.data.contributesTo as studentAssociation (studentAssociation.uid)}
            <Avatar avatar={studentAssociation} />
        {/each}
    {/if}
{/if}
