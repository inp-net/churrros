<script lang="ts">
    import { Flex, Frame } from 'azucar-ui';

    import { getLocale } from '#lib/paraglide/runtime.js';

    interface Props {
        selected: boolean;
        today: boolean;
        disabled?: boolean;
        date: Date;
        eventCount: number;
        onclick?: () => void;
    }

    const {
            selected,
            today,
            disabled,
            date,
            eventCount: numberOfEvents,
            onclick,
        }: Props = $props(),
        maxNumberOfDots = 3,
        dayOfWeekPrefix = $derived(
            new Intl.DateTimeFormat(getLocale(), { weekday: 'short' }).format(date),
        );
</script>

<Frame
    interactive={!disabled}
    class={[
        'card-event-day-container',
        selected ? 'selected' : '',
        today ? 'today' : '',
        disabled ? 'neutral' : '',
    ]}
    {onclick}
>
    <Flex align="center" justify="center" direction="column" gap="zero">
        <small>{dayOfWeekPrefix.toUpperCase()}</small>
        <h3>{date.getDate()}</h3>
        <small>
            {#each Array(numberOfEvents).slice(0, maxNumberOfDots) as _}
                <span>•</span>
            {/each}
            {#if numberOfEvents > maxNumberOfDots}
                <span>+</span>
            {/if}
        </small>
    </Flex>
</Frame>

<style>
    :global(.card-event-day-container) {
        color: var(--color-fg-low) !important;
        padding: var(--size-xs) !important;
        border-radius: var(--corner-radius-sm) !important;
        flex-basis: 0;
        flex-grow: 1;
    }

    :global(.card-event-day-container.today) {
        color: var(--color-fg) !important;
        background-color: var(--color-bg) !important;
    }

    :global(.card-event-day-container.selected) {
        color: var(--color-fg) !important;
        box-shadow: inset 0 0 0 1px var(--color-border-subtle);
    }

    :global(.card-event-day-container:hover) {
        background-color: var(--color-bg-hover);
    }
</style>
