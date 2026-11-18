<script lang="ts">
    import { browser } from '$app/env';
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';
    import { Toaster } from 'svelte-sonner';

    import 'azucar-ui/tokens.css';
    import 'azucar-ui/base.css';
    import favicon from '#lib/assets/favicon.svg';
    import Header from '#lib/components/Header.svelte';
    import NavBar from '#lib/components/NavBar.svelte';

    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // To disabled server side queries : https://tanstack.com/query/latest/docs/framework/svelte/ssr
                enabled: browser,
                staleTime: 15 * 60 * 1000, // 15 minutes of cache
            },
        },
    });
</script>

<svelte:head>
    <title>Churros</title>
    <link rel="icon" href={favicon} />
    <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
</svelte:head>

<QueryClientProvider client={queryClient}>
    <div class="container">
        <Stack gap="lg">
            <Header />
            {@render children()}
            <NavBar user={data.user} />
        </Stack>
    </div>
    <Toaster />
</QueryClientProvider>

<style>
    :root {
        /* Set azucar-ui theme */
        --base-color: oklch(80.45% 0.1666 72.92);
        color-scheme: light dark;

        /* Set the scroll behavior for the entire page */
        scroll-behavior: smooth;
    }

    .container {
        /* Limit page width */
        width: calc(100% - var(--size-md) * 2);
        max-width: 550px;
        margin: var(--size-md) auto;
        padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
            env(safe-area-inset-left);

        overflow-x: clip;
    }
</style>
