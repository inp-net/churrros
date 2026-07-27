import type { OAuthProvider } from "../../types";

//TODO : Voir si c'est un bon format déjà
export const authentikProvider: OAuthProvider = {
    async initiateLogin() {
        // TODO : A faire 
    },

    async handleCallback(callbackUrl: string) {
        //TODO : A faire
        return {
            token: "dummy-token",
            expiresAt: new Date()
        };
    },

    async logout() {
        // TODO : A faire
    }
};