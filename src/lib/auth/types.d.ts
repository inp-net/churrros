import type { SessionToken } from '#lib/api/index.ts';

export type AuthProvider = CredentialsProvider | OAuthProvider;

export interface CredentialsProvider {
    login: (emailOrUid: string, password: string) => Promise<SessionToken>;
}

export interface OAuthProvider {
    name: string;
    iconUrl: string;
    loginUrl: (url: URL) => URL;
    logoutUrl: () => URL;
}
