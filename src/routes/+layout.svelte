<script lang="ts">
    import { browser } from '$app/environment';
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import favicon from '$lib/assets/favicon.svg';
    import 'azucar-ui/tokens.css';
    import 'azucar-ui/base.css';
    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { Stack } from 'azucar-ui';
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                //Pour desactiver les query coté serveur : https://tanstack.com/query/latest/docs/framework/svelte/ssr
                enabled: browser
            }
        }
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
    <div class="container">
        <Stack gap="lg">
            <Header />
            {@render children()}
            <NavBar user={data.user} />
        </Stack>
    </div>
</QueryClientProvider>

<style>
    /* set azucar-ui theme */
    :root {
        --base-color: oklch(80.45% 0.1666 72.92);
        color-scheme: light dark;
    }

    /* limit page width */
    .container {
        width: calc(100% - var(--size-md) * 2);
        max-width: 550px;
        margin: var(--size-md) auto;
        overflow-x: hidden;
    }
</style>
