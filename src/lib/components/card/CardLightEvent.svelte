<script lang="ts">
    import type { LightEvent } from '#lib/api/index.ts';
    import { formatISODateToLocale } from '#lib/utils/dates.ts';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        event: LightEvent;
    }

    let { event }: Props = $props();
</script>

<Avatar avatar={event.organizer} />
{event.title}
{event.startsAt ? formatISODateToLocale(event.startsAt) : 'N/A'}
{event.endsAt ? formatISODateToLocale(event.endsAt) : 'N/A'}
{event.location}
