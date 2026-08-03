import type { CredentialsProvider } from "../types";
import { authRepository } from "$lib/api";
import { setToken } from "$lib/auth/session";

export const credentialsProvider: CredentialsProvider = {
    async login(emailOrUid: string, password: string) {
        try {
            const sessionToken = await authRepository.login(emailOrUid, password);
            setToken(sessionToken);
            return sessionToken;
        } catch (error) {
            throw new Error("Invalid email or password");
        }
    }
};