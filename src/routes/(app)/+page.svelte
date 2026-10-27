<script lang="ts">
    import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
    import { articleRepository, userRepository } from '#lib/api/index.ts';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import CardArticle from '#lib/components/card/CardArticle.svelte';
    import CardBirthday from '#lib/components/card/CardBirthday.svelte';
    import { Skeleton, Stack } from 'azucar-ui';
    import { m } from '#lib/paraglide/messages.js';

    const query = createInfiniteQuery(() => ({
        queryKey: ['articles'],
        queryFn: ({ pageParam }) => articleRepository.getArticles({ first: 10, after: pageParam }),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =>
            lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
        notifyOnChangeProps: 'all'
    }));

    const birthdayQuery = createQuery(() => ({
        queryKey: ['todayBirthdays'],
        queryFn: () => userRepository.getBirthdays(true),
        notifyOnChangeProps: 'all'
    }));

    const articles = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
</script>

{#if birthdayQuery.isPending}
    <Skeleton height="var(--size-xl)" />
{:else if birthdayQuery.isSuccess}
    <CardBirthday avatars={birthdayQuery.data} />
{/if}

<h3>{m.announcements()}</h3>

<InfiniteScroll
    hasNextPage={query.hasNextPage}
    isFetching={query.isFetchingNextPage || query.isPending}
    loadMore={query.fetchNextPage}
    rootMargin="0px 0px 400px 0px"
>
    {#snippet loading()}
        <Stack>
            {#each Array(4) as _}
                <Skeleton height={`calc(var(--size-xxl) * ${Math.random() * 3 + 1})`} />
            {/each}
        </Stack>
    {/snippet}
    <Stack>
        {#each articles as article (article.id)}
            <CardArticle {article} />
        {/each}
    </Stack>
</InfiniteScroll>
