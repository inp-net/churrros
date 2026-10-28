<script lang="ts">
    import { PlusIcon } from '@lucide/svelte';
    import { Button, Flex } from 'azucar-ui';

    import ChurrosBorderIcon from '#lib/assets/ChurrosBorderIcon.svelte';
</script>

<Flex class="header" justify="space-between" align="center">
    <Flex gap="sm">
        <ChurrosBorderIcon />
        <h3 class="header-title">Churros</h3>
    </Flex>
    <Button variant="ghost" icon={PlusIcon} />
</Flex>

<style>
    :global(.header) {
        color: var(--color-fg-low);
    }

    .header-title {
        font-weight: normal;
    }
</style>
