<script lang="ts">
    import { userRepository } from '#lib/api/index.ts';
    import { createQuery } from '@tanstack/svelte-query';
    import type { User, UserInfos } from '#lib/api/index.ts';
    import Profile from '#lib/components/Profile.svelte';

    interface PageData {
        user?: User;
    }

    const { data }: { data: PageData } = $props();

    const userInfosQuery = createQuery<UserInfos>(() => ({
        queryKey: ['userInfos'],
        queryFn: () => userRepository.getUserInfos(data.user!.uid)
    }));

    const profileData: User & UserInfos = $derived(
        Object.assign({}, data.user, userInfosQuery.data)
    );
</script>

<br />

{#if userInfosQuery.data && data.user}
    <Profile profile={profileData} />
{:else if userInfosQuery.isLoading}
    <Profile loading />
{:else if userInfosQuery.isError}
    <p>Error: {userInfosQuery.error.message}</p>
{/if}

<style>
    br {
        height: var(--size-xl);
    }
</style>
