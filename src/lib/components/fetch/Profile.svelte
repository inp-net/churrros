<script lang="ts">
    import { userRepository } from '#lib/api/index.ts';
    import { createQuery } from '@tanstack/svelte-query';
    import type { UserProfile } from '#lib/api/types.ts';
    import HeaderName from '#lib/components/HeaderName.svelte';

    interface Props {
        uid: string;
    }

    let { uid }: Props = $props();

    const userQuery = createQuery(() => ({
        queryFn: () => userRepository.getUserProfile(uid),
        notifyOnChangeProps: 'all',
        enabled: uid !== null
    }));

    const user: UserProfile = $derived(userQuery.data);
</script>

{#if userQuery.isPending}
    <HeaderName loading />
{:else if userQuery.isSuccess}
    <HeaderName
        name={user.fullName}
        pictureURL={user.pictureURL}
        description={user.description}
        badges={[{ text: 'Test', url: '' }]}
        nickname="test"
    />
{/if}
