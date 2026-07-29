import type { OAuthProvider } from "../../types";
import { setToken } from "$lib/auth/session";

//TODO : Voir si c'est un bon format déjà
export const authentikProvider: OAuthProvider = {
    async initiateLogin() {
        // TODO : A faire 
    },

    async handleCallback(callbackUrl: string) {
        //TODO : A faire
        const sessionToken = {
            token: "dummy-token",
            expiresAt: new Date(Date.now() + 3600 * 1000)
        };

        setToken(sessionToken);
        return sessionToken;
    },

    async logout() {
        // TODO : A faire
    }
};