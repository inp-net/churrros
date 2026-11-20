<script lang="ts">
    import { ExternalLink } from '@lucide/svelte';
    import { Badge, Flex } from 'azucar-ui';

    import type { Link } from '#lib/api/index.ts';

    interface Props {
        link: Link;
    }

    let { link }: Props = $props();
</script>

<a target="_blank" href={link.url} rel="noopener noreferrer">
    <Badge variant="outline">
        <Flex align="center" wrap="nowrap" gap="xs">
            <span>{link.text}</span>
            {#if link.url && !link.url.startsWith('/')}
                <ExternalLink size="0.78rem" />
            {/if}
        </Flex>
    </Badge>
</a>
