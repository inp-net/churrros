<script lang="ts">
    import type { Event } from '$lib/api';
    import { formatISODateToLocale } from '$lib/utils/dates';
    import { Avatar, Button, Flex, Frame, Stack } from 'azucar-ui';
    import { ArrowRightIcon, CalendarIcon, MapPinIcon } from '@lucide/svelte';

    interface Props {
        /**
         * L'event à afficher dans la carte
         */
        event: Event;
        /**
         * Si on annonce le shotgun qui s'ouvre plutot que l'event
         */
        shotgun?: boolean;
    }

    let { event }: Props = $props();

    const formatDate = (date: string | null) => {
        if (!date) return 'N/A';
        return formatISODateToLocale(date, {
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
        });
    };
</script>

<Frame
    class="event-card"
    shadow
    border
    interactive
    onclick={() => (window.location.href = `/events/${event.id}`)}
    role="button"
>
    <Stack>
        <Flex justify="space-between">
            <Flex gap="xs">
                <Avatar src={event.organizer.pictureURL} alt={event.organizer.name} size="lg" />
                <Stack gap="zero">
                    <small>{event.organizer.name}</small>
                    <h4>{event.title}</h4>
                </Stack>
            </Flex>

            <Button variant="ghost" icon={ArrowRightIcon} />
        </Flex>
        <p class="event-description">{event.descriptionPreview}</p>
        <Flex justify="space-between">
            {#if event.startsAt || event.endsAt}
                <Flex justify="center" align="center" gap="xs">
                    <CalendarIcon />
                    <p>
                        <span>
                            {formatDate(event.startsAt)}
                        </span>
                        -
                        <span>
                            {formatDate(event.endsAt)}
                        </span>
                    </p>
                </Flex>
            {/if}
            {#if event.location.length > 0}
                <Flex justify="center" align="center" gap="xs">
                    <MapPinIcon />
                    <p>{event.location}</p>
                </Flex>
            {/if}
        </Flex>
    </Stack>
</Frame>

<style>
    .event-description {
        color: var(--color-fg-low);
    }
</style>
