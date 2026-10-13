<script lang="ts">
    import { m } from '#lib/paraglide/messages.js';
    import type { Snippet } from 'svelte';
    // Inspired by https://github.com/ndom91/svelte-infinite

    interface Props {
        /**
         * Boolean that shows if there is a next page to load.
         */
        hasNextPage: boolean;
        /**
         * Boolean that shows if the next page is currently being fetched. This is used to show a loading indicator and to prevent multiple calls.
         */
        isFetching: boolean;
        /**
         * Callback to use to load the next page.
         */
        loadMore: () => unknown;
        /**
         * CSS margin to use for the intersection observer. This is used to trigger the loadMore callback before the user reaches the bottom of the page. Default is '0px 0px 400px 0px'
         */
        rootMargin?: string;
        /**
         * Content to display inside the infinite scroll component. This is usually a list of items.
         */
        children: Snippet;
        /**
         * Content to display while the next page is being fetched (optionnal). If not provided, a default loading indicator will be used.
         */
        loading?: Snippet;
    }

    let {
        hasNextPage,
        isFetching,
        loadMore,
        rootMargin = '0px 0px 400px 0px',
        children,
        loading
    }: Props = $props();

    let intersectionTarget: HTMLDivElement | undefined = $state();
    // To avoid calling loadMore multiple times
    let isLoading = false;

    async function attemptLoadMore() {
        if (!isLoading && !isFetching && hasNextPage) {
            isLoading = true;
            try {
                await loadMore();
            } finally {
                isLoading = false;
            }
        }
    }

    // $effect is called whenever the values used inside it change, here intersectionTarget.
    $effect(() => {
        if (!intersectionTarget) return;

        // Triggered when the observed object is inside the intersection area (the viewport) + rootMargin which enlarges this area
        // So by default we will trigger when the searched object is 400px from the bottom of the page
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0]?.isIntersecting) {
                    await attemptLoadMore();
                }
            },
            { rootMargin }
        );
        observer.observe(intersectionTarget);

        // Cleanup of the observer
        return () => {
            observer.disconnect();
        };
    });
</script>

<div>
    {@render children()}

    <div class="intersection-target" bind:this={intersectionTarget}>
        {#if isFetching}
            {#if loading}
                {@render loading()}
            {:else}
                <p>{m['loading']()}</p>
            {/if}
        {/if}
    </div>
</div>
