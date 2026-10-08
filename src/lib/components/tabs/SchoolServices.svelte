<script lang="ts">
    import type { CardService as CardServiceType } from '$lib/api';
    import CardService from '../card/CardService.svelte';

    interface Props {
        services: CardServiceType[];
    }

    let { services }: Props = $props();
</script>

{#each services as service (service.id)}
    <CardService {service} />
{/each}
