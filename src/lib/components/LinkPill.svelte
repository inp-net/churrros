<script lang="ts">
    import { ExternalLink } from '@lucide/svelte';
    import type { Link } from '#lib/api/index.ts';
    import { Badge, Flex } from 'azucar-ui';

    interface Props {
        link: Link;
    }

    let { link }: Props = $props();
</script>

<a href={link.url}>
    <Badge variant="outline">
        <Flex align="center" wrap={false} gap="xs">
            <span>{link.text}</span>
            <ExternalLink size="0.78rem" />
        </Flex>
    </Badge>
</a>
