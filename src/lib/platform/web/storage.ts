import type { Storage } from '../types';

export const storage: Storage = {
    get(key: string): Promise<string | null> {
        try {
            return Promise.resolve(localStorage.getItem(key));
        } catch {
            return Promise.resolve(null);
        }
    },
    set(key: string, value: string): Promise<void> {
        try {
            return Promise.resolve(localStorage.setItem(key, value));
        } catch {
            return Promise.resolve();
        }
    },
    remove(key: string): Promise<void> {
        try {
            localStorage.removeItem(key);
        } catch {}
        return Promise.resolve();
    },
};
