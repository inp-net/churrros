import type { Action } from 'svelte/action';

export const scrollspy: Action<HTMLElement, () => void> = (
    node: HTMLElement,
    onActive: () => void
) => {
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visible.length > 0) {
                onActive();
            }
        },
        {
            rootMargin: '-100px 0px -70% 0px',
            threshold: 0
        }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
};
