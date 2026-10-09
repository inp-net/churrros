<script lang="ts">
    import { page } from '$app/state';
    import { articleRepository } from '#lib/api/index.ts';
    import Avatar from '#lib/components/avatar/Avatar.svelte';
    import CardEvent from '#lib/components/card/CardEvent.svelte';
    import LinkPill from '#lib/components/LinkPill.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import { createQuery } from '@tanstack/svelte-query';

    const query = createQuery(() => ({
        queryKey: ['article', page.params.id],
        queryFn: () => articleRepository.getArticleById(page.params.id)
    }));
</script>

<div>
    {#if query.isPending}
        <p>{m['loading']()}</p>
    {:else if query.isError}
        <!--Si l'event n'existe pas on est dans une erreur-->
        <p>Error: {query.error.message}</p>
    {:else if query.isSuccess}
        {query.data.title} <br />
        <Avatar avatar={query.data.group} />
        {query.data.content} <br />
        <!--Techniquement c'est du html mais j'aime vraiment que ce soit du html mais bon-->
        <img src={query.data.pictureURL} alt={query.data.title} /> <br />

        {formatISODateToLocale(query.data.publishedAt)} <br />

        {#each query.data.links as link (link.url)}
            <LinkPill {link} />
        {/each}

        {#if query.data.event}
            <CardEvent event={query.data.event} />
        {/if}
    {/if}
</div>
