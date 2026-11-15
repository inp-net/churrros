import { Preferences } from '@capacitor/preferences';

import type { Storage } from '../types';

export const storage: Storage = {
    async get(key: string): Promise<string | null> {
        const { value } = await Preferences.get({ key });
        return value;
    },
    async set(key: string, value: string): Promise<void> {
        return await Preferences.set({ key, value });
    },
    async remove(key: string): Promise<void> {
        await Preferences.remove({ key });
    },
};
