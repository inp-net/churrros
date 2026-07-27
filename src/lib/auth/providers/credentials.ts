import type { CredentialsProvider } from "../types";
import { authRepository } from "$lib/api";

export const credentialsProvider: CredentialsProvider = {
    async login(emailOrUid: string, password: string) {
        try {
            return await authRepository.login(emailOrUid, password);
        } catch (error) {
            throw new Error("Invalid email or password");
        }
    }
};