<script lang="ts">
    import { ArrowRightIcon } from '@lucide/svelte';
    import { Avatar, Button, Flex, Frame, Stack } from 'azucar-ui';

    import type { Article } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';

    interface Props {
        article: Article;
    }

    let { article }: Props = $props();
</script>

<Frame
    class="article-card"
    shadow
    border
    interactive
    onclick={() => (window.location.href = `/articles/${article.id}`)}
    role="button"
>
    {#if article.pictureURL && article.pictureURL.length > 0}
        <div class="article-image-wrapper" style="--image-url: url({article.pictureURL});"></div>
    {/if}
    <Stack padding="md">
        <Flex justify="space-between" wrap={'nowrap'}>
            <Flex gap="xs" wrap={'nowrap'}>
                <Avatar src={article.group.pictureURL} alt={article.group.name} size="lg" />
                <Stack gap="zero">
                    <small>
                        {article.group.name} • {formatISODateToLocale(article.publishedAt)}
                    </small>
                    <h4>{article.title}</h4>
                </Stack>
            </Flex>
            <Button variant="ghost" icon={ArrowRightIcon} />
        </Flex>
        <p class="article-description">{article.content}</p>
    </Stack>
</Frame>

<style>
    :global(.article-card) {
        padding: 0 !important;
        overflow: hidden;
        position: relative;
    }

    /* Add a border around the card */
    :global(.article-card)::after {
        border-radius: inherit;
        box-shadow: inherit;
        content: '';
        inset: 0;
        pointer-events: none;
        position: absolute;
    }

    .article-description {
        color: var(--color-fg-low);
    }

    .article-image-wrapper {
        width: 100%;
        aspect-ratio: 2/1;
        background-image: var(--image-url);
        background-size: cover;
        background-position: center;
    }
</style>
