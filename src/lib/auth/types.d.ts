import type { SessionToken } from '#lib/api/index.ts';

export type AuthProvider = CredentialsProvider | OAuthProvider;

export type CredentialsProvider = {
    login: (emailOrUid: string, password: string) => Promise<SessionToken>;
};

export type OAuthProvider = {
    name: string;
    iconUrl: string;
    loginUrl: (url: URL) => URL;
    logoutUrl: () => URL;
};
