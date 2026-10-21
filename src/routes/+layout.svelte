<script lang="ts">
    import type { Path } from '$app/types';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { locales, localizeHref } from '#lib/paraglide/runtime.js';
    import { browser } from '$app/env';
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import favicon from '#lib/assets/favicon.svg';
    import 'azucar-ui/tokens.css';
    import 'azucar-ui/base.css';
    import { Toaster } from 'svelte-sonner';

    let { data, children } = $props();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // To disabled server side queries : https://tanstack.com/query/latest/docs/framework/svelte/ssr
                enabled: browser,
                staleTime: 15 * 60 * 1000 // 15 minutes of cache
            }
        }
    });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<QueryClientProvider client={queryClient}>
    <div class="container">
        {@render children()}
    </div>
    <Toaster />
</QueryClientProvider>

<div style="display:none">
    {#each locales as locale (locale)}
        <a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
    {/each}
</div>

<style>
    /* set azucar-ui theme */
    :root {
        --base-color: oklch(80.45% 0.1666 72.92);
        color-scheme: dark;
    }

    /* limit page width */
    .container {
        max-width: min(900px, 100%);
        margin: 0 auto;
    }
</style>
