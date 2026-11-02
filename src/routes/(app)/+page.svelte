<script lang="ts">
    import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
    import { articleRepository, userRepository } from '#lib/api/index.ts';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import CardArticle from '#lib/components/card/CardArticle.svelte';
    import CardBirthday from '#lib/components/card/CardBirthday.svelte';
    import { Button, Skeleton, Stack } from 'azucar-ui';
    import { m } from '#lib/paraglide/messages.js';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

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
        notifyOnChangeProps: 'all',
        enabled: data.user !== null
    }));

    const articles = $derived(query.data?.pages.flatMap((page) => page.items) ?? []);
</script>

{#if data.user === null}
    <p>{m['login.birthdays']()}</p>
    <Button href="/login">{m.login()}</Button>
    <!-- TODO : ONCE SIGNUP EXISTS ADD IT HERE-->
{:else}
    {#if birthdayQuery.isPending}
        <Skeleton height="var(--size-xl)" />
    {:else if birthdayQuery.isSuccess}
        <CardBirthday avatars={birthdayQuery.data} />
    {/if}
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
