<script lang="ts">
    import { type LucideIcon } from '@lucide/svelte';
    import { Frame, Flex } from 'azucar-ui';

    interface Props {
        content: string;
        copy?: string;
        icon?: LucideIcon;
    }

    let { content, copy = content, icon: Icon }: Props = $props();
</script>

<button type="button" onclick={() => navigator.clipboard.writeText(copy)}>
    <Frame interactive>
        <Flex wrap="nowrap" gap="md" align="center">
            {#if Icon}
                <Icon size="1rem" />
            {/if}
            <span>{content}</span>
        </Flex>
    </Frame>
</button>
