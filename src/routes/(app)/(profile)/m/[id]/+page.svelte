<script lang="ts">
    import { page } from '$app/state';
    import { createQuery } from '@tanstack/svelte-query';

    import { majorRepository } from '#lib/api/index.ts';
    import CardMajor from '#lib/components/card/CardMajor.svelte';
    import { m } from '#lib/paraglide/messages.js';

    const queryProfile = createQuery(() => ({
        queryFn: () => majorRepository.getMajorProfile(page.params.id),
        queryKey: ['major', page.params.id],
    }));
</script>

<div>
    {#if queryProfile.isPending}
        <p>{m['loading']()}</p>
    {:else if queryProfile.isError}
        <p>ERROR</p>
    {:else if queryProfile.data}
        <CardMajor major={queryProfile.data} />
    {/if}
</div>
