<script lang="ts">
    import { page } from '$app/state';
    import { LinkIcon } from '@lucide/svelte';
    import { createQuery } from '@tanstack/svelte-query';
    import { Avatar, Button, Flex, Skeleton, Stack } from 'azucar-ui';

    import { articleRepository } from '#lib/api/index.ts';
    import CardEvent from '#lib/components/card/CardEvent.svelte';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';

    const query = createQuery(() => ({
        queryFn: () => articleRepository.getArticleById(page.params.id),
        queryKey: ['article', page.params.id],
    }));
</script>

{#if query.isPending}
    <Skeleton height="var(--size-md)" />
    <Skeleton height="var(--size-lg)" />
    <Skeleton height="calc(var(--size-xxl) * 5)" />
{:else if query.isError}
    <!--Si l'event n'existe pas on est dans une erreur-->
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    <Stack>
        <Flex align="center">
            <Avatar src={query.data.group.pictureURL} alt={query.data.group.name} size="lg" />
            <p>{query.data.group.name}</p>
            {formatISODateToLocale(query.data.publishedAt)}
        </Flex>

        <h3>{query.data.title}</h3>
    </Stack>

    {@html query.data.content}

    <img src={query.data.pictureURL} alt={query.data.title} />

    <Flex>
        {#each query.data.links as link (link.url)}
            <Button icon={LinkIcon} href={link.url} variant="outline">{link.text}</Button>
        {/each}
    </Flex>

    {#if query.data.event}
        <CardEvent event={query.data.event} />
    {/if}
{/if}
