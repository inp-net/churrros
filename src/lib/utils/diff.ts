/**
 * Basic deep equality check for objects and arrays.
 * Right now it only checks for arrays and primitive values.
 * @param a the first value to compare
 * @param b the second value to compare
 * @returns true if the values are deeply equal, false otherwise
 */
function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
    }
    return false;
}

/**
 * Returns a patch object that contains only the fields that have changed from the initial object to the current object.
 * @param initial the initial object
 * @param current the current object
 * @returns a patch object with the changed fields
 */
export function diffPatch<T extends Record<string, unknown>>(initial: T, current: T): Partial<T> {
    const patch: Partial<T> = {};
    for (const key of Object.keys(current) as (keyof T)[]) {
        if (!deepEqual(initial[key], current[key])) patch[key] = current[key];
    }
    return patch;
}
