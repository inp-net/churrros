import { authRepository } from '#lib/api/index.ts';
import { setToken, writeCookie, AUTHED_VIA_COOKIE_NAME } from '#lib/auth/session.ts';

import type { CredentialsProvider } from '../types';

export const credentialsProvider: CredentialsProvider = {
    async login(emailOrUid: string, password: string) {
        try {
            const sessionToken = await authRepository.login(emailOrUid, password);
            setToken(sessionToken);
            writeCookie(AUTHED_VIA_COOKIE_NAME, 'credentials', sessionToken.expiresAt); // TODO: remove when the api also sets authed_via for credential login
            return sessionToken;
        } catch {
            throw new Error('Invalid email or password');
        }
    },
};
