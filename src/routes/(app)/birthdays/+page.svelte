<script lang="ts">
    import { userRepository } from '$lib/api';
    import Avatar from '$lib/components/avatar/Avatar.svelte';
    import { m } from '$lib/paraglide/messages';
    import { formatISODateToLocale, toISODate } from '$lib/utils/dates';
    import { createQuery } from '@tanstack/svelte-query';

    const today = toISODate(new Date());

    const query = createQuery(() => ({
        queryKey: ['birthdays'],
        queryFn: () => userRepository.getGroupedBirthdays(true, undefined, 10),
        notifyOnChangeProps: 'all'
    }));
</script>

<h2>{m['birthdays']()}</h2>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#each Object.entries(query.data) as [date, avatars] (date)}
        <h2>{date === today ? m['today']() : formatISODateToLocale(date)}</h2>
        {#each avatars as avatar (avatar.uid)}
            <Avatar {avatar} />
        {/each}
    {/each}
{/if}
