<script lang="ts">
    import type { EventsByDay } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import CardEvent from './CardEvent.svelte';

    /**
     * Composant pour afficher les events sur une journée donnée, en différenciant les events par ceux dont le shotgun s'ouvre et ceux qui commencent ce jour là.
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
