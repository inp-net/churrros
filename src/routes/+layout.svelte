<script lang="ts">
    import { browser } from '$app/env';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import type { Path } from '$app/types';
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { Stack } from 'azucar-ui';
    import { Toaster } from 'svelte-sonner';

    import 'azucar-ui/tokens.css';
    import 'azucar-ui/base.css';
    import favicon from '#lib/assets/favicon.svg';
    import Header from '#lib/components/Header.svelte';
    import NavBar from '#lib/components/NavBar.svelte';
    import { locales, localizeHref } from '#lib/paraglide/runtime.js';

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
        }),
        // Because resolve function has issues when the path as more than 25 options
        // I don't know the proper way to fix it
        resolvePath = resolve as (pathname: string) => string;
</script>

<svelte:head>
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

<div style="display:none">
    {#each locales as locale (locale)}
        <a href={resolvePath(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
    {/each}
</div>

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
