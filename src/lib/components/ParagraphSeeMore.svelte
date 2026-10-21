<script lang="ts">
    import { Flex, Stack, Button } from 'azucar-ui';
    import { m } from '#lib/paraglide/messages.js';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    let isExpanded = $state(false);
    let content = $state<HTMLElement | null>(null);
    let box = $state<HTMLElement | null>(null);
    let isOverflowing = $derived(content && box && content.scrollHeight > box.clientHeight);
</script>

<Stack>
    <div class="paragraph" bind:this={box} class:expanded={isExpanded}>
        <div bind:this={content}>
            {@render children()}
        </div>
    </div>

    {#if isOverflowing || isExpanded}
        <Flex justify="right">
            <Button
                variant="ghost"
                type="button"
                style="padding-top: 0;"
                onclick={() => (isExpanded = !isExpanded)}
            >
                {isExpanded ? m['see_less']() : m['see_more']()}
            </Button>
        </Flex>
    {/if}
</Stack>

<style>
    .paragraph {
        height: 2.5rem;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .paragraph.expanded {
        height: auto;
        overflow: visible;
    }
</style>
