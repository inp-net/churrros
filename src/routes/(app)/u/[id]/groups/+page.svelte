<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '$lib/api';
    import Avatar from '$lib/components/avatar/Avatar.svelte';
    import { m } from '$lib/paraglide/messages';
    import { createQuery } from '@tanstack/svelte-query';

    const query = createQuery(() => ({
        queryKey: ['user', page.params.id, 'groups'],
        queryFn: () => userRepository.getUserGroups(page.params.id)
    }));
</script>

{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <!--If the user is not found-->
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#each query.data?.groups as groupMember (groupMember.group.uid)}
        <Avatar avatar={groupMember.group} />
        <!-- QUESTION : In Churros V2 there is a roleemojis that gives the users emoji fro their role-->
        <!--I believe this should only be client side and has nothing to do with the server -->
        {#if groupMember.president}
            <span>👑</span>
        {/if}
        {#if groupMember.vicePresident}
            <span>⭐</span>
        {/if}
        {#if groupMember.secretary}
            <span>📝</span>
        {/if}
        {#if groupMember.treasurer}
            <span>💰</span>
        {/if}
        <p>{groupMember.title}</p>
    {/each}
{/if}
