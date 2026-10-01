<script lang="ts">
    import { page } from '$app/state';
    import { userRepository } from '$lib/api';
    import { createQuery } from '@tanstack/svelte-query';
    import { m } from '$lib/paraglide/messages';
    import { Stack } from 'azucar-ui';
    import Avatar from '$lib/components/avatar/Avatar.svelte';
    import LinkPill from '$lib/components/LinkPill.svelte';

    let { children } = $props();

    const query = createQuery(() => ({
        queryKey: ['user', page.params.id],
        queryFn: () => userRepository.getUserProfile(page.params.id)
    }));
</script>

<Stack>
    <div>
        {#if query.isPending}
            <p>{m['loading']()}</p>
        {:else if query.isError}
            <!--If the user is not found-->
            <p>Error: {query.error.message}</p>
        {:else if query.isSuccess}
            {#if query.data}
                <Avatar avatar={query.data} />
                {query.data.fullName}
                {query.data.yearTier}
                {#if query.data.major}
                    <Avatar avatar={query.data.major} />
                {/if}
                {#each query.data.school as school (school.uid)}
                    <Avatar avatar={school} />
                {/each}
                {#each query.data.links as link (link.url)}
                    <LinkPill {link} />
                {/each}
                Bot : {query.data.bot}
                Admin : {query.data.admin} <br />
                {query.data.description}
                <!-- More HTML that I don't want to render-->
            {/if}
        {/if}
    </div>
    <div>
        <nav>
            <a href="/u/{page.params.id}">{m['info']()}</a>
            <a href="/u/{page.params.id}/groups">{m['groups']()}</a>
            <a href="/u/{page.params.id}/family">{m['family']()}</a>
        </nav>
        {@render children()}
    </div>
</Stack>
