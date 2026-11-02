<script lang="ts">
    import { Stack } from 'azucar-ui';

    import type { EventsByDay } from '#lib/api/index.ts';

    import CardEvent from './CardEvent.svelte';

    /**
     * Component to display events on a given day, differentiating between events whose shotgun opens and those that start that day.
     */
    interface Props {
        event: EventsByDay;
    }

    let { event }: Props = $props();
</script>

<Stack>
    {#each event.shotgunning as shotgunEvent (shotgunEvent.id)}
        <CardEvent event={shotgunEvent} shotgun={true} />
    {/each}
    {#each event.happening as happeningEvent (happeningEvent.id)}
        <CardEvent event={happeningEvent} />
    {/each}
</Stack>
