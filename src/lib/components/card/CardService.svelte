<script lang="ts">
    import { Pencil } from '@lucide/svelte';
    import { Frame, Avatar, Stack, Button } from 'azucar-ui';

    import type { CardService } from '#lib/api/index.ts';

    interface Props {
        service: CardService;
    }

    let { service }: Props = $props();
</script>

<Frame
    class="service-card"
    shadow
    border
    interactive
    role="button"
    onclick={() => (window.location.href = service.url)}
>
    <Stack gap="sm">
        <div class="header">
            {#if service.canEdit}
                <div class="edit" onclick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" icon={Pencil} href={`/services/${service.id}/edit`} />
                </div>
            {/if}

            <Avatar src={service.logo} alt={service.name} size="xxl" />
        </div>

        <Stack gap="zero" class="service-card-content">
            <h4>{service.name}</h4>
            <small class="small">{service.description}</small>
        </Stack>
    </Stack>
</Frame>

<style>
    .small {
        color: var(--color-fg-low);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        min-height: 2lh;
    }

    .header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .edit {
        position: absolute;
        top: calc(-0.75 * var(--size-md));
        right: calc(-0.75 * var(--size-md));
    }

    :global(.service-card) {
        display: flex;
        flex-direction: column;
    }

    :global(.service-card-content) {
        margin-top: auto;
    }
</style>
