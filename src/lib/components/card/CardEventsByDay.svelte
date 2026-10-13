<script lang="ts">
    import type { EventsByDay } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import CardEvent from './CardEvent.svelte';

    /**
     * Component to display events on a given day, differentiating between events whose shotgun opens and those that start that day.
     */
    interface Props {
        event: EventsByDay;
    }

    let { event }: Props = $props();
</script>

<div>
    Date : {formatISODateToLocale(event.date)}
    <br />
    {#each event.shotgunning as shotgunEvent (shotgunEvent.id)}
        <CardEvent event={shotgunEvent} shotgun={true} />
    {/each}
    {#each event.happening as happeningEvent (happeningEvent.id)}
        <CardEvent event={happeningEvent} />
    {/each}
</div>
