<script lang="ts">
    import { page } from '$app/state';
    import { majorRepository } from '$lib/api';
    import CardMajor from '$lib/components/card/CardMajor.svelte';
    import { m } from '$lib/paraglide/messages';
    import { createQuery } from '@tanstack/svelte-query';

    const queryProfile = createQuery(() => ({
        queryKey: ['major', page.params.id],
        queryFn: () => majorRepository.getMajorProfile(page.params.id)
    }));
</script>

<div>
    {#if queryProfile.isLoading}
        <p>{m['loading']()}</p>
    {:else if queryProfile.isError}
        <p>ERROR</p>
    {:else if queryProfile.data}
        <CardMajor major={queryProfile.data} />
    {/if}
</div>
