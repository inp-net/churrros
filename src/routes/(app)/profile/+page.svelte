<script lang="ts">
    import { userRepository } from '#lib/api/index.ts';
    import { createQuery } from '@tanstack/svelte-query';
    import type { User, UserInfos, ProfileData } from '#lib/api/index.ts';
    import Profile from '#lib/components/Profile.svelte';

    interface PageData {
        user?: User;
    }

    const { data }: { data: PageData } = $props();

    const userInfosQuery = createQuery<UserInfos>(() => ({
        queryKey: ['userInfos'],
        queryFn: () => userRepository.getUserInfos(data.user!.uid)
    }));

    const profileData = $derived<ProfileData | null>(
        data.user && userInfosQuery.data
            ? {
                  firstName: data.user.firstName,
                  lastName: data.user.lastName,
                  pictureURL: data.user.pictureURL,
                  email: userInfosQuery.data.email,
                  phone: userInfosQuery.data.phone,
                  birthday: userInfosQuery.data.birthday,
                  address: userInfosQuery.data.address
              }
            : null
    );
</script>

<br />

{#if profileData}
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
