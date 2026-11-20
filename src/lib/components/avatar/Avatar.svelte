<script lang="ts">
    import { ExternalLink } from '@lucide/svelte';
    import { Badge, Flex } from 'azucar-ui';

    import type { Avatar as AvatarType } from '#lib/api/index.ts';

    interface Props {
        avatar: AvatarType;
        link?: string;
        width?: number;
        height?: number;
        variant?: 'default' | 'outline' | 'ghost' | undefined;
    }

    let { avatar, link, width, height, variant = 'ghost' }: Props = $props();
</script>

{#snippet badgeContent()}
    <Badge {variant}>
        <Flex align="center" wrap="nowrap" gap="xs">
            {#if avatar.pictureURL}
                <img
                    src={avatar.pictureURL}
                    alt={avatar.name}
                    class="image-inline"
                    style:width={width ? `${width}px` : undefined}
                    style:height={height ? `${height}px` : undefined}
                />
            {/if}
            <span>{avatar.name}</span>
            {#if link && !link.startsWith('/')}
                <ExternalLink size="0.7rem" />
            {/if}
        </Flex>
    </Badge>
{/snippet}

{#if link}
    <a href={link} target="_blank" rel="noopener noreferrer">
        {@render badgeContent()}
    </a>
{:else}
    {@render badgeContent()}
{/if}

<style>
    .image-inline {
        height: 1.2em;
        width: 1.2em;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    }
</style>
