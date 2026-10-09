<script lang="ts">
    import { page } from '$app/state';
    import { setLocale, getLocale } from '#lib/paraglide/runtime.js';
    import { m } from '#lib/paraglide/messages.js';
    import { Button, ButtonGroup, Stack } from 'azucar-ui';
    import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
    import { articleRepository, userRepository } from '#lib/api/index.ts';
    import InfiniteScroll from '#lib/components/InfiniteScroll.svelte';
    import CardArticle from '#lib/components/card/CardArticle.svelte';
    import Avatar from '#lib/components/avatar/Avatar.svelte';

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

<Stack gap="xl">
    <Stack>
        <h1>Churros</h1>
    </Stack>

    {#if page.data.user}
        <h3>{m['hello_world']({ name: page.data.user.firstName })}</h3>
    {:else}
        <Button href="/login">{m['login']()}</Button>
    {/if}

    <ButtonGroup>
        <Button
            variant={getLocale() == 'en' ? 'outline' : 'default'}
            onclick={() => setLocale('en')}
        >
            en
        </Button>
        <Button
            variant={getLocale() == 'es' ? 'outline' : 'default'}
            onclick={() => setLocale('es')}
        >
            es
        </Button>
        <Button
            variant={getLocale() == 'fr' ? 'outline' : 'default'}
            onclick={() => setLocale('fr')}
        >
            fr
        </Button>
    </ButtonGroup>

    <a href="/events">{m['events']()}</a>
</Stack>

<div>
    {#if birthdayQuery.isPending}
        <p>{m['loading']()}</p>
    {:else if birthdayQuery.isError}
        <p>Error: {birthdayQuery.error.message}</p>
    {:else if birthdayQuery.isSuccess}
        <h2><a href="/birthdays">{m['birthdays']()}</a></h2>
        {#each birthdayQuery.data as avatar (avatar.uid)}
            <Avatar {avatar} />
        {/each}
    {/if}
</div>

<!--Temporaire, dans tous les cas on aura pas ça-->
<h2>Articles</h2>

<InfiniteScroll
    hasNextPage={query.hasNextPage}
    isFetching={query.isFetchingNextPage}
    loadMore={query.fetchNextPage}
    rootMargin="0px 0px 400px 0px"
>
    {#if query.isPending}
        <p>{m['loading']()}</p>
    {:else if query.isError}
        <p>Error: {query.error.message}</p>
    {:else if query.isSuccess}
        {#each articles as article (article.id)}
            <CardArticle {article} />
            <br />
        {/each}
    {/if}
    {#snippet loading()}
        <!--Si on veut override le chargement-->
        <p>{m['loading']()}</p>
    {/snippet}
</InfiniteScroll>
