import { authRepository } from '#lib/api/index.ts';
import { setToken, writeCookie } from '#lib/auth/session.ts';

import type { CredentialsProvider } from '../types';

export const credentialsProvider: CredentialsProvider = {
    async login(emailOrUid: string, password: string) {
        try {
            const sessionToken = await authRepository.login(emailOrUid, password);
            setToken(sessionToken);
            writeCookie('authed_via', 'credentials', sessionToken.expiresAt);
            return sessionToken;
        } catch {
            throw new Error('Invalid email or password');
        }
    },
};
