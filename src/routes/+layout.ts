import { browser } from '$app/env';

import { meRepository } from '#lib/api/index.ts';

export const ssr = false;

export const load = async () => {
    if (browser && !/(^|; )authed_via=(credentials|oauth2)/.test(document.cookie)) {
        return { user: null };
    }

    try {
        const user = await meRepository.getMe();
        return { user };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { user: null };
    }
};
