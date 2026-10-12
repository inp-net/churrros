<script lang="ts">
    import { Details, Flex } from 'azucar-ui';
    import { CakeIcon } from '@lucide/svelte';
    import { m } from '$lib/paraglide/messages';
</script>

<Details shadow border>
    {#snippet summarySnippet()}
        <Flex align="center">
            <CakeIcon />
            <h4>{m['birthdays']()}</h4>
        </Flex>
    {/snippet}
</Details>
