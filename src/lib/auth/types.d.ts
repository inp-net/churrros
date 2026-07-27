import type { SessionToken } from "$lib/api";

export type AuthProvider = CredentialsProvider | OAuthProvider;

export type CredentialsProvider = {
    async login: (emailOrUid: string, password: string) => Promise<SessionToken>;
}

export type OAuthProvider = {
    async initiateLogin: () => Promise<void>;
    async handleCallback: (callbackUrl: string) => Promise<SessionToken>;
    async logout: () => Promise<void>;
}