import { meRepository } from '#lib/api/index.ts';
import { getToken } from '#lib/auth/session.ts';

export const ssr = false;

export const load = async () => {
    const token = await getToken();
    const hasCookieAuth = /(^|; )authed_via=(credentials|oauth2)/.test(document.cookie);
    if (!token && !hasCookieAuth) {
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
