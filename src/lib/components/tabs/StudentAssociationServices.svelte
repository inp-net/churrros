<script lang="ts">
    import { m } from '$lib/paraglide/messages';
    import type { Page, CardService as CardServiceType, Link } from '$lib/api';
    import CardService from '../card/CardService.svelte';

    interface Props {
        services: Page<CardServiceType>;
        seeAll: Link;
    }

    let { services, seeAll }: Props = $props();
</script>

{#each services.items as service}
    <CardService {service} />
{/each}

{#if services.pageInfo.hasNextPage}
    <a href={seeAll.url}>{seeAll.text}</a>
{/if}
