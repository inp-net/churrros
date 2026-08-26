<script lang="ts">
    import { Flex } from 'azucar-ui';
    import ChurrosIcon from '$lib/assets/ChurrosIcon.svelte';
    import ChurrosBorderIcon from '$lib/assets/ChurrosBorderIcon.svelte';

    type Props = {
        variant?: 'default' | 'border';
    };

    let {
        variant = 'default'
    }: Props = $props();
</script>

<Flex wrap={false} gap="md" align="center">
    <div class="icon">
        {#if variant == 'default'}
            <ChurrosIcon />
        {:else}
            <ChurrosBorderIcon />
        {/if}
    </div>
    <h2 class="title">Churros</h2>
</Flex>

<style>
    .title {
        font-weight: 450;
    }

    .icon {
        width: 4em;
        height: 4em;
    }

    :global(.icon > svg) {
        width: 100%;
        height: 100%;
    }
</style>
