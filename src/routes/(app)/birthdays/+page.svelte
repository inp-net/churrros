<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';

    import { userRepository } from '#lib/api/index.ts';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';

    const now = new Date(),
        today = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`, // MM-DD Format
        query = createQuery(() => ({
            notifyOnChangeProps: 'all',
            queryFn: () => userRepository.getGroupedBirthdays(true, undefined, 10),
            queryKey: ['birthdays'],
        }));
</script>

<h2>{m['birthdays']()}</h2>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#each Object.entries(query.data) as [date, avatars] (date)}
        <h2>
            {date === today
                ? m['today']()
                : formatISODateToLocale(`2077-${date}`, { day: 'numeric', month: 'long' })}
        </h2>
        {#each avatars as avatar (avatar.uid)}
            <Avatar {avatar} />
        {/each}
    {/each}
{/if}
