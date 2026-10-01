<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '$lib/api';
    import { createQuery } from '@tanstack/svelte-query';

    let { children } = $props();

    const query = createQuery(() => ({
        queryKey: ['user', page.params.id],
        queryFn: () => userRepository.getUserProfile(page.params.id)
    }));
</script>
