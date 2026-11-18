<script lang="ts">
    import { ExternalLink } from '@lucide/svelte';
    import type { Link } from '#lib/api/index.ts';
    import { Badge, Flex } from 'azucar-ui';

    interface Props {
        link: Link;
    }

    let { link }: Props = $props();
</script>

<a target="_blank" href={link.url} rel="noopener noreferrer">
    <Badge variant="outline">
        <Flex align="center" wrap={false} gap="xs">
            <span>{link.text}</span>
            {#if link.url && link.url.startsWith('http')}
                <ExternalLink size="0.78rem" />
            {/if}
        </Flex>
    </Badge>
</a>
