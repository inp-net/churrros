<script lang="ts">
    import type { CardService as CardServiceType, Link, Page } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';

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
