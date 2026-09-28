<script lang="ts">
    import type { Pathname } from '$app/types';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { locales, localizeHref } from '$lib/paraglide/runtime';
    import { browser } from '$app/environment';
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import favicon from '$lib/assets/favicon.svg';
    import 'azucar-ui/tokens.css';
    import 'azucar-ui/base.css';

    let { data, children } = $props();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                //Pour desactiver les query coté serveur : https://tanstack.com/query/latest/docs/framework/svelte/ssr
                enabled: browser,
                staleTime: 15 * 60 * 1000 // 15 minutes de cache
            }
        }
    });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<QueryClientProvider client={queryClient}>
    <div class="container">
        {@render children()}
    </div>
</QueryClientProvider>

<div style="display:none">
    {#each locales as locale (locale)}
        <a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
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
