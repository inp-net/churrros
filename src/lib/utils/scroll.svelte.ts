import { browser } from '$app/environment';
import type { PageInfo } from '$lib/api';

//Tiré du truc de churros v2 mais en svelte 5

type ScrollOptions = {
    /**
     * Pageinfo de la dernière page chargée. Permet de savoir si on est à la fin ou pas.
     * Undefined si aucune page n'a été chargée.
     * @returns PageInfo de la dernière page chargée ou undefined
     */
    pageInfo: PageInfo | undefined;
    /**
     * Callback à appeler pour charger la page suivante.
     * @returns Promise qui se résout quand la page est chargée
     */
    loadMore: () => Promise<unknown>;
    /**
     * Permet de savoir si on est en train de charger une page ou pas. 
     * @returns true si on est en train de charger une page, false sinon
     */
    isFetching: boolean;
    /**
     * Nombre d'éléments avant la fin de la liste à partir duquel on déclenche le callback loadMore. 
     * Par défaut 3.
     */
    threshold?: number;
};

export function infiniteScroll(container: HTMLElement, options: ScrollOptions) {
    if (!browser) return;

    let opts = $state(options);
    let intersectionObserver: IntersectionObserver | undefined;

    function restartIntersectionObserver(): IntersectionObserver | undefined {
        const elements = [...container.children] as HTMLElement[];
        const target = elements.at(elements.length - (opts.threshold ?? 3));

        // Si y a pas le target, c'est qu'on l'a dépassé, donc on declenche le callback pour charger plus.
        // On empeche de redeclecncher si on est en train de charger une page ou si on est à la fin de la liste.
        if (!target) {
            if (!opts.pageInfo?.hasNextPage || opts.isFetching) return;
            opts.loadMore();
            return;
        }

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    if (!opts.pageInfo?.hasNextPage || opts.isFetching) return;
                    opts.loadMore();
                }
            },
            //J'ai changé le threshold à 0 et le rootMargin à 400 px pour que ça se déclenche plus tot
            //Ptet un cas spécifique j'ai beaucoup agrandi le composant pr tester
            { threshold: 0, rootMargin: '400px' },
        );
        intersectionObserver.observe(target);
        return intersectionObserver;
    }

    intersectionObserver = restartIntersectionObserver();

    const mutatationObserver = new MutationObserver(() => {
        intersectionObserver?.disconnect();
        intersectionObserver = restartIntersectionObserver();
    });

    mutatationObserver.observe(container, { childList: true });

    return {
        update(newOptions: ScrollOptions) {
            opts = newOptions;
        },
        destroy() {
            intersectionObserver?.disconnect();
            mutatationObserver.disconnect();
        },
    };
}

