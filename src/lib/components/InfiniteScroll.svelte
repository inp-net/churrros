<script lang="ts">
    import { m } from '#lib/paraglide/messages.js';
    import type { Snippet } from 'svelte';
    // Inspired by https://github.com/ndom91/svelte-infinite

    interface Props {
        /**
         * Indique si il y a une page suivante à charger, si false alors y a plus de données.
         */
        hasNextPage: boolean;
        /**
         * Indique si on est en train de charger la page suivante, pour empêcher de faire plusieurs requêtes en même temps.
         */
        isFetching: boolean;
        /**
         * Callback a appeler pour charger la page suivante.
         */
        loadMore: () => unknown;
        /**
         * Distance en px entre le bas de la page et le bas de l'élément pour déclencher le chargement de la page suivante.
         */
        rootMargin?: string;
        /**
         * Contenu à afficher dans le composant, (la liste d'éléments à afficher avec scroll infini).
         */
        children: Snippet;
        /**
         * Contenu à afficher lorsque la page suivante est en train de se charger.
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
