<script lang="ts">
    import type { Article } from '$lib/api';
    import { formatISODateToLocale } from '$lib/utils/dates';
    import Avatar from '../avatar/Avatar.svelte';
    import LinkPill from '../LinkPill.svelte';

    interface Props {
        /**
         * L'article à afficher dans la carte
         */
        article: Article;
    }

    let { article }: Props = $props();
</script>

<div>
    {article.title}
    <br />
    <Avatar avatar={article.group} />
    {article.contentPreview}
    <img src={article.pictureURL} alt={article.title} />
    {formatISODateToLocale(article.publishedAt)}
    {#each article.links as link (link.url)}
        <LinkPill {link} />
    {/each}
</div>
