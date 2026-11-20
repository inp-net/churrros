/**
 * Function that returns a debounced value of a given function after a specified delay.
 * This function is inside a .svelte.ts to use the $state and $effect Svelte features.
 * @param getValue The function that returns the value to be debounced.
 * @param delay the delay in milliseconds before the value is updated (default is 300ms).
 * @returns the debounced value of the function.
 */
export function debounced<T>(getValue: () => T, delay = 300) {
    let current = $state(getValue());

    $effect(() => {
        const value = getValue(),
            timeout = setTimeout(() => (current = value), delay);
        return () => {
            clearTimeout(timeout);
        };
    });

    return {
        get current() {
            return current;
        },
    };
}
