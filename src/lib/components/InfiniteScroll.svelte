<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';
	//Inspiré de https://github.com/ndom91/svelte-infinite

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
	//Pr eviter de loadMore plusieurs fois
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

	//En gros effect est appelé à chaque modification sur les valeurs utilisées, ici intersectionTarget.
	//Donc quand intersectionTarget change
	$effect(() => {
		if (!intersectionTarget) return;

		//Trigger quand l'objet observé est à l'intérieur de la zone d'intersection (le viewport) + rootMargin qui agrandit cette zone
		//Donc par défaut on va trigger quand l'objet cherché est à 400px du bas de la page
		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries[0]?.isIntersecting) {
					await attemptLoadMore();
				}
			},
			{ rootMargin }
		);
		observer.observe(intersectionTarget);

		//Nettoyage de l'observer car il n'est plus nécessaire
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
