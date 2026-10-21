<script lang="ts">
    import type { Article } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import { Avatar, Button, Flex, Frame, Stack } from 'azucar-ui';
    import { ArrowRightIcon } from '@lucide/svelte';

    interface Props {
        article: Article;
    }

    let { article }: Props = $props();
</script>

<Frame
    class="event-card"
    shadow
    border
    interactive
    onclick={() => (window.location.href = `/articles/${article.id}`)}
    role="button"
>
    <Stack>
        <Flex justify="space-between">
            <Flex gap="xs">
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
        <p>{article.content}</p>
    </Stack>
</Frame>
